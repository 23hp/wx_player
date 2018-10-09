# wx_player
微信傻瓜音频播放器
【已停止维护】
微信小程序的坑不少，平时工作的一半时间在做业务需求，一半时间修补微信留下的BUG  (T_T)

遇到的坑：
- 两个音频播放API，playVoice和playBackgroundAudio，
一个播本地录音，一个播在线音频，用错了播不了。
- 对应两个停止API：stopVoice和stopBackgroundAudio，
设置回调也不一样，前一个API回调是参数，后一个需要监听onBackgroundAudioStop()。
- 正在播音时，调playVoice再播一个声音，
头一个声音的播放完成回调马上执行，第二个声音播放完成后，没有回调！
- 小程序playBackgroundAudio接口播放失败未回调。

因为公司业务功能重度依赖录音、播放，经常要用到这两个API，为了减轻搭档们的痛苦，我把这块功能代码封装了下，用了以后，感觉不错，现在开源分享给大家。


### 功能
- 播放音频，本地在线通吃
- 播放远程录音，会下载到本地再播放，需在小程序后台配置好下载域名。
- 修复小程序多个音频时回调错乱的问题。
- 修复小程序播放无法访问的链接时，不回调的问题。
### 目录说明
- core 播放器核心代码。

### 使用方法
1. 复制core目录下的soundPlayer.js文件到你的项目目录，的utils文件夹下
2. 在需要地方引入，然后创建一个实例

       import {SoundPlayer} from "../../utils/soundPlayer.js";
       let player= new SoundPlayer();

播放音频

        player.playVoice("音频路径", ()=> {
              //播放完成回调
        });

停止播放

        player.stopVoice();
        
### 已知问题
- 播放在线音频出错时没有回调，需要官方修复API的BUG


