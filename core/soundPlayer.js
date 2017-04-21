/**
 * Created by 23hp on 2017/4/13.
 */
export class SoundPlayer {

    /**
     * 通用声音播放器
     * @param url 音频路径
     * @param onComplete 播放完成回调
     */
    play(url, onComplete) {
        this.
        if (this._isVoice(url)) {
            if (this._isLocalFile(url)) {
                //播放本地文件
                this._playVoice(url, onComplete);
            } else {
                //下载到本地并播放
                this._download(url).then(
                    localPath => {this._playVoice(localPath, onComplete);},//下载成功
                    fail => {onComplete()}//下载失败
                );
            }
        } else {
            //播放在线音频
            this._playAudio(url, onComplete);
        }
    }

    /**
     * 通用声音停止
     */
    stop() {
        this._stopAudio();
        this._stopVoice();
    }

    /**
     * 播放在线声音
     * @param url
     * @param onComplete
     */
    _playAudio(url, onComplete = () => {}) {
        wx.onBackgroundAudioStop(() => {});
        wx.stopBackgroundAudio({
            complete(){
                wx.playBackgroundAudio({
                    dataUrl: url
                });
                wx.onBackgroundAudioStop(() => {
                    onComplete();
                    wx.onBackgroundAudioStop(() => {});//防止单独掉微信playBackgroundAudio接口时再次回调
                });
            }
        });
    }

    /**
     * 停止播放在线声音
     */
    _stopAudio() {
        wx.onBackgroundAudioStop(() => {});
        wx.stopBackgroundAudio();
    }

    /**
     * 播放本地语音
     * @param recordUrl
     * @param onComplete
     */
    _playVoice(recordUrl, onComplete = () => {}) {
        wx.stopVoice({
            complete(){
                setTimeout(function () {
                    wx.playVoice({
                        filePath: recordUrl,
                        complete(){
                            onComplete();
                        }
                    });
                }, 500);//设置延迟以防两个音频同时放时回调冲突
            }
        })
    }

    /**
     * 停止播放本地语音
     */
    _stopVoice() {
        wx.stopVoice();
    }

    _isVoice(url) {
        return url.endsWith(".silk");
    }
    _isLocalFile(url) {
        return url.startsWith("wxfile:")
    }
    _download(url) {
        return new Promise((resolve, reject) => {
            wx.downloadFile({
                url: url,
                success(res) {
                    resolve(res.tempFilePath);
                },
                fail(res){
                    reject(res);
                }
            })
        });
    }
}
