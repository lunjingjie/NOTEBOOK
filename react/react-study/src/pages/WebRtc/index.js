import { Button } from 'antd';
import React, { useRef, useState } from 'react';
import 'webrtc-adapter';
import P2p from './p2p';

// 本地和远端的连接对象
let localPeerConnection = null;
let remotePeerConnection = null;

export default React.memo(() => {
	// 本地流和远程流
	const [localStream, setLocalStream] = useState();
	const [remoteStream, setRemoteStream] = useState();

	// 本地视频和远端视频元素
	const localVideo = useRef();
	const remoteVideo = useRef();

	// 设置约束
	const mediaStreamConstrains = {
		video: true
	};

	// 设置仅交换视频
	const offerOptions = {
		offerToReceiveVideo: 1
	};

	// 禁用状态
	const [isDisableStartBtn, setIsDisableStartBtn] = useState(false);
	const [isDisableCallBtn, setIsDisableCallBtn] = useState(false);
	const [isDisableHangupBtn, setIsDisableHangupBtn] = useState(false);

	// 讲音视频流展示并保存到localStream
	const gotLocalMediaStream = (mediaStream) => {
		localVideo.current.srcObject = mediaStream;
		setLocalStream(mediaStream);
		setIsDisableCallBtn(false);
	};

	const startHandle = () => {
		setIsDisableStartBtn(true);
		// 获取本地音视频流
		navigator.mediaDevices
			.getUserMedia(mediaStreamConstrains)
			.then(gotLocalMediaStream)
			.catch((err) => {
				console.log('getUserMedia错误', err);
			});
	};

	// 端与端建立连接
	const handleConnection = (event) => {
		const peerConnection = event.target;
		const icecandidate = event.candidate;

		if (icecandidate) {
			const newIceCandidate = new RTCIceCandidate(icecandidate);
			const otherPeer = getOtherPeer(peerConnection);
			otherPeer
				.addIceCandidate(newIceCandidate)
				.then(() => {
					handleConnectionSuccess(peerConnection);
				})
				.catch((err) => {
					handleConnectionFailure(peerConnection, err);
				});
		}
	};

	const gotRemoteMediaStream = (event) => {
		if (remoteVideo.current.srcObject !== event.streams[0]) {
			remoteVideo.current.srcObject = event.streams[0];
			setRemoteStream(event.streams[0]);
			console.log('remote 开始接受远端流');
		}
	};

	const createdAnswer = (description) => {
		console.log(`远端应答Answer的sdp:\n${description.sdp}`);
		// 远端设置本地描述并将它发给本地
		// 远端保存 answer
		remotePeerConnection
			.setLocalDescription(description)
			.then(() => {
				console.log('remote 设置本地描述信息成功');
			})
			.catch((err) => {
				console.log('remote 设置本地描述信息错误', err);
			});
		// 本地将远端的应答描述设置为远端描述
		// 本地保存 answer
		localPeerConnection
			.setRemoteDescription(description)
			.then(() => {
				console.log('local 设置远端描述信息成功');
			})
			.catch((err) => {
				console.log('local 设置远端描述信息错误', err);
			});
	};

	const createdOffer = (description) => {
		console.log(`本地创建offer返回的sdp:\n${description.sdp}`);
		// 本地设置描述并将它发送给远端
		// 将 offer 保存到本地
		localPeerConnection
			.setLocalDescription(description)
			.then(() => {
				console.log('local 设置本地描述信息成功');
			})
			.catch((err) => {
				console.log('local 设置本地描述信息错误', err);
			});
		// 远端将本地给它的描述设置为远端描述
		// 远端将 offer 保存
		remotePeerConnection
			.setRemoteDescription(description)
			.then(() => {
				console.log('remote 设置远端描述信息成功');
			})
			.catch((err) => {
				console.log('remote 设置远端描述信息错误', err);
			});
		// 远端创建应答 answer
		remotePeerConnection
			.createAnswer()
			.then(createdAnswer)
			.catch((err) => {
				console.log('远端创建应答 answer 错误', err);
			});
	};

	const callHandle = () => {
		setIsDisableCallBtn(true);
		setIsDisableHangupBtn(false);
		// 视频轨道
		const videoTracks = localStream.getVideoTracks();
		// 音频轨道
		const audioTracks = localStream.getAudioTracks();
		// 判断视频轨道是否有值
		if (videoTracks.length) {
			console.log(`使用设备为：${videoTracks[0].label}`);
		}
		// 判断音频轨道是否有值
		if (audioTracks.length) {
			console.log(`使用设备为：${audioTracks[0].label}`);
		}
		const servers = null;

		// 创建RTCPeerConnection对象
		localPeerConnection = new RTCPeerConnection(servers);
		// 监听返回的candidate
		localPeerConnection.addEventListener('icecandidate', handleConnection);
		// 监听ice状态变化
		localPeerConnection.addEventListener('iceconnectionstatechange', handleConnectionChange);

		remotePeerConnection = new RTCPeerConnection(servers);
		remotePeerConnection.addEventListener('icecandidate', handleConnection);
		remotePeerConnection.addEventListener('iceconnectionstatechange', handleConnectionChange);
		remotePeerConnection.addEventListener('track', gotRemoteMediaStream);

		// 遍历本地流的所有轨道
		localStream.getTracks().forEach((track) => {
			localPeerConnection.addTrack(track, localStream);
		});
		// 交换媒体描述信息
		localPeerConnection
			.createOffer(offerOptions)
			.then(createdOffer)
			.catch((err) => {
				console.log('createdOffer错误', err);
			});
	};

	const hangupHandle = () => {
		console.log(localPeerConnection);
		localPeerConnection.close();
		remotePeerConnection.close();
		localPeerConnection = null;
		remotePeerConnection = null;
		setIsDisableHangupBtn(true);
		setIsDisableCallBtn(false);
	};

	function handleConnectionChange(event) {
		const peerConnection = event.target;
		console.log('ICE state change event: ', event);
		console.log(
			`${getPeerName(peerConnection)} ICE state: ` + `${peerConnection.iceConnectionState}.`
		);
	}

	function handleConnectionSuccess(peerConnection) {
		console.log(`${getPeerName(peerConnection)} addIceCandidate 成功`);
	}

	function handleConnectionFailure(peerConnection, error) {
		console.log(
			`${getPeerName(peerConnection)} addIceCandidate 错误:\n` + `${error.toString()}.`
		);
	}

	function getPeerName(peerConnection) {
		return peerConnection === localPeerConnection
			? 'localPeerConnection'
			: 'remotePeerConnection';
	}

	function getOtherPeer(peerConnection) {
		return peerConnection === localPeerConnection ? remotePeerConnection : localPeerConnection;
	}

	return (
		<>
			<div style={{ display: 'flex' }}>
				<video id="localVideo" ref={localVideo} autoPlay playsInline></video>
				<video id="remoteVideo" ref={remoteVideo} autoPlay playsInline></video>
			</div>

			<div>
				<Button id="startBtn" disabled={isDisableStartBtn} onClick={startHandle}>
					打开本地视频
				</Button>
				<Button id="callBtn" disabled={isDisableCallBtn} onClick={callHandle}>
					建立连接
				</Button>
				<Button id="hangupBtn" disabled={isDisableHangupBtn} onClick={hangupHandle}>
					断开连接
				</Button>
			</div>
      <div>
        <P2p></P2p>
      </div>
		</>
	);
});
