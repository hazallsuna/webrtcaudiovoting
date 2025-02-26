'use strict';

const socket = io();

const localAudio = document.getElementById('localAudio');
const remoteAudio = document.getElementById('remoteAudio');
const resetVotesButton = document.getElementById('resetVotesButton');
const voteCount = document.getElementById('voteCount');
const voteHistoryList = document.getElementById('voteHistoryList');
const startCallIcon = document.getElementById('startCall');
const endCallIcon = document.getElementById('endCall');

let votes = { yes: 0, no: 0, maybe: 0 };
let voteHistory = [];
let peerConnection;
let localStream;

//start call icon tıkla mic erişim al
startCallIcon.addEventListener('click', async () => {
    try {
        localStream = await navigator.mediaDevices.getUserMedia({ audio: true });
        localAudio.srcObject = localStream;

        //icon güncelle
        startCallIcon.style.display = 'none';
        endCallIcon.style.display = 'inline-block';

        startCall();
    } catch (error) {
        console.error("Error accessing microphone:", error);
        alert("Microphone access denied. Please allow access to continue.");
    }
});

// webrtc çağrısı başlat
async function startCall() {
    peerConnection = new RTCPeerConnection();

    // local stream'i baglantıya ekle
    localStream.getTracks().forEach(track => peerConnection.addTrack(track, localStream));

    // uzaktaki ses akışını al ve audio aktar 
    peerConnection.ontrack = (event) => {
        console.log("uzaktaki ses alındı",event.streams);
        if(event.streams && event.streams[0]){
          remoteAudio.srcObject = event.streams[0];  
        }else{
            console.log("uzaktan ses akışı yok");
        }
        
    };

    // ıce adaylarını yönet
    peerConnection.onicecandidate = (event) => {
        if (event.candidate) {
            console.log("yeni ICE adayı:",event.candidate);
            sendSignal({ type: 'candidate', candidate: event.candidate });
        }
    };

    // sdp teklifi oluştur ve gönder
    const offer = await peerConnection.createOffer();
    await peerConnection.setLocalDescription(offer);
    sendSignal({ type: 'offer', offer: offer });
}

// sinyal mesaj
socket.on('signal', async (message) => {
    if (!peerConnection) return;
  
    switch (message.type) {
        case 'offer':
            await peerConnection.setRemoteDescription(new RTCSessionDescription(message.offer));
            const answer = await peerConnection.createAnswer();
            await peerConnection.setLocalDescription(answer);
            sendSignal({ type: 'answer', answer });
            break;
        case 'answer':
            await peerConnection.setRemoteDescription(new RTCSessionDescription(message.answer));
            break;
        case 'candidate':
            await peerConnection.addIceCandidate(new RTCIceCandidate(message.candidate));
            break;
    }
});

// sinyal mesajlarını sunucuya gönder
function sendSignal(message) {
    socket.emit('signal', message);
}

// oy mekanizması
function castVote(vote) {
    socket.emit('vote', vote);
}
//oyları sıfırla
resetVotesButton.addEventListener('click', () => {
    socket.emit('resetVotes');
});
//oy sayısnı güncelle
function updateVoteDisplay() {
    voteCount.textContent = `Yes: ${votes.yes}, No: ${votes.no}, Maybe: ${votes.maybe}`;
}
//oylama geçmişi güncelle
function updateVoteHistoryDisplay() {
    voteHistoryList.innerHTML = ''; 
    voteHistory.forEach(entry => {
        const li = document.createElement('li');
        li.textContent = `${entry.option.toUpperCase()} - ${new Date(entry.time).toLocaleTimeString()}`;
        voteHistoryList.appendChild(li);
    });
}

socket.on('updateVote', (data) => {
    votes = data.votes;
    voteHistory = data.voteHistory;
    updateVoteDisplay();
    updateVoteHistoryDisplay();
});

//endcall icon bastıgında cagrı sonlanır
endCallIcon.addEventListener('click', () => {
    endCall();
});

// End the call
function endCall() {
    if (peerConnection) {
        peerConnection.close();
        peerConnection = null;
    }
    if (localStream) {
        localStream.getTracks().forEach(track => track.stop());
        localStream = null;
    }
    remoteAudio.srcObject = null;
    localAudio.srcObject = null;

    endCallIcon.style.display='none';
    startCallIcon.style.display='inline-block';
}

