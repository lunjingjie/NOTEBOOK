import React, { useEffect, useRef, useState } from 'react';
import 'webrtc-adapter';
import { Button, Input } from 'antd';
import './style.scss';

// 创建一条由本地计算机到远端的WebRTC连接
let pc = new RTCPeerConnection({
	iceServers: [{ urls: 'stun:stunvoipbuster.com' }]
});

// 创建本地和远端的空媒体流
let localStream = null;
let remoteStream = null;

export default React.memo(() => {
	const offerSdp = useRef('');
	const offerSdp2 = useRef('');
	const answerSdp = useRef('');
	const answerSdp2 = useRef('');

	const localVideo = useRef();
	const remoteVideo = useRef();

	useEffect(() => {
		async function getMedia() {
			localStream = await navigator.mediaDevices.getUserMedia({
				video: true,
				audio: false
			});
			// 添加本地视频流
			localVideo.current.srcObject = localStream;
			// 添加本地流到pc
			console.log(localStream);
			localStream.getTracks().forEach((track) => {
				pc.addTrack(track, localStream);
			});
			// 监听远程流
			pc.ontrack = (event) => {
				remoteVideo.current.srcObject = event.streams[0];
			};
		}
		getMedia();
	}, []);

	// 创建offer（提案）
	const createOffer = async () => {
		const offer = await pc.createOffer();
		await pc.setLocalDescription(offer);
		// 监听 RTCPeerConnection 的 onicecandidate 事件，当 ICE 服务器返回一个新的候选地址时，就会触发该事件
		pc.onicecandidate = async (event) => {
			if (event.candidate) {
				offerSdp.current = JSON.stringify(pc.localDescription);
			}
		};
	};

	const createAnswer = async () => {
		// 解析字符串
		const offer = JSON.parse(offerSdp2.current);
		pc.onicecandidate = (event) => {
			if (event.candidate) {
				answerSdp.current = JSON.stringify(pc.localDescription);
			}
		};
		await pc.setRemoteDescription(offer);
		const answer = await pc.createAnswer();
		await pc.setLocalDescription(answer);
	};

	const addAnswer = async () => {
		const answer = JSON.parse(answerSdp2.current);
		if (!pc.currentRemoteDescription) {
			pc.setRemoteDescription(answer);
		}
	};

	const copyToClipboard = (val) => {
		navigator.clipboard.writeText(val);
	};

	return (
		<>
			<div className="page-container">
				<div className="video-container">
					<div className="video-box">
						<video ref={localVideo} autoPlay playsInline muted></video>
						<div className="video-title">我</div>
					</div>
					<div className="video-box">
						<video ref={remoteVideo} autoPlay playsInline></video>
						<div className="video-title">远程视频</div>
					</div>
				</div>
				<div className="operation">
					<div className="step">
						<div className="user">用户1的操作区域</div>
						<p className="desc">
							点击 Create Offer，生成 SDP offer，把下面生成的offer 复制给用户 2
							<Button id="create-offer" type="primary" onClick={createOffer}>
								创建 Offer
							</Button>
						</p>
						<p>SDP offer:</p>
						<Input value={offerSdp}></Input>
						<Button type="success" onClick={(offerSdp) => copyToClipboard(offerSdp)}>
							点击复制
						</Button>
					</div>
					<div className="step">
						<div className="user">用户2 的操作区域</div>
						<p>
							用户2将用户1 刚才生成的SDP offer 粘贴到下方，点击 "创建答案
							"来生成SDP答案，然后将 SDP Answer 复制给用户1。
						</p>

						<Input value={offerSdp2}></Input>
						<Button type="success" onClick={createAnswer}>
							创建 Answer
						</Button>

						<p>SDP Answer:</p>
						<Input value={answerSdp}></Input>
						<Button
							type="success"
							size="default"
							onClick={(answerSdp) => copyToClipboard(answerSdp)}
						>
							点击复制
						</Button>
					</div>
					<div className="step">
						<div className="user">用户1 的操作区域</div>

						<p>将用户2 创建的 Answer 粘贴到下方，然后点击 Add Answer。</p>

						<p>SDP Answer:</p>
						<Input value={answerSdp2}></Input>
						<Button type="success" size="default" onClick={addAnswer}>
							Add Answer
						</Button>
					</div>
				</div>
			</div>
		</>
	);
});
