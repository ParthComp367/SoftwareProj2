import React, { useEffect, useRef, useState } from 'react';
import { useNavigate, useParams, useLocation } from 'react-router-dom';
import Peer from 'simple-peer';
import { useAuthStore } from '../store/authStore';
import { useThemeStore } from '../store/themeStore';
import { 
  Camera, Mic, MicOff, Video, VideoOff, PhoneOff, 
  MonitorUp, Download, Eye, EyeOff, Maximize2, 
  Layout, LayoutGrid, FlipHorizontal, Sun, Moon
} from 'lucide-react';
import PerformanceCheck from '../components/PerformanceCheck';
import MeetingInstructions from '../components/MeetingInstructions';

export default function Meeting() {
  const navigate = useNavigate();
  const location = useLocation();
  const { meetingId } = useParams();
  const user = useAuthStore((state) => state.user);
  const { isDarkMode, toggleTheme } = useThemeStore();
  const { selectedInterviewee } = location.state || {};
  
  const [showPerformanceCheck, setShowPerformanceCheck] = useState(true);
  const [showInstructions, setShowInstructions] = useState(false);
  const [stream, setStream] = useState<MediaStream | null>(null);
  const [isAudioEnabled, setIsAudioEnabled] = useState(true);
  const [isVideoEnabled, setIsVideoEnabled] = useState(true);
  const [isScreenSharing, setIsScreenSharing] = useState(false);
  const [isRecording, setIsRecording] = useState(false);
  const [isControlsVisible, setIsControlsVisible] = useState(true);
  const [isCameraMirrored, setIsCameraMirrored] = useState(true);
  const [viewMode, setViewMode] = useState<'gallery' | 'single'>('gallery');
  const [peerConnected, setPeerConnected] = useState(false);
  
  const myVideo = useRef<HTMLVideoElement>(null);
  const peerVideo = useRef<HTMLVideoElement>(null);
  const peerRef = useRef<Peer.Instance | null>(null);
  const mediaRecorderRef = useRef<MediaRecorder | null>(null);
  const recordedChunksRef = useRef<Blob[]>([]);

  useEffect(() => {
    if (!showPerformanceCheck && !showInstructions) {
      startMedia();
    }
    
    return () => {
      if (stream) {
        stream.getTracks().forEach(track => track.stop());
      }
      if (peerRef.current) {
        peerRef.current.destroy();
      }
      if (mediaRecorderRef.current && isRecording) {
        mediaRecorderRef.current.stop();
      }
    };
  }, [showPerformanceCheck, showInstructions]);

  const startMedia = async () => {
    try {
      const mediaStream = await navigator.mediaDevices.getUserMedia({
        video: true,
        audio: true
      });
      
      if (myVideo.current) {
        myVideo.current.srcObject = mediaStream;
        setStream(mediaStream);
        initializePeer(mediaStream);
      }
    } catch (error) {
      console.error('Error accessing media devices:', error);
    }
  };

  const initializePeer = (mediaStream: MediaStream) => {
    const peer = new Peer({
      initiator: user?.role === 'interviewer',
      trickle: false,
      stream: mediaStream
    });

    peer.on('signal', data => {
      // Here you would send the signal data to the other peer
      console.log('Signal data:', data);
    });

    peer.on('stream', peerStream => {
      if (peerVideo.current) {
        peerVideo.current.srcObject = peerStream;
        setPeerConnected(true);
      }
    });

    peer.on('connect', () => {
      setPeerConnected(true);
    });

    peer.on('close', () => {
      setPeerConnected(false);
    });

    peerRef.current = peer;
  };

  const toggleScreenShare = async () => {
    try {
      if (!isScreenSharing) {
        const screenStream = await navigator.mediaDevices.getDisplayMedia({
          video: true,
          audio: true
        });
        
        if (myVideo.current) {
          myVideo.current.srcObject = screenStream;
          if (peerRef.current) {
            const videoTrack = screenStream.getVideoTracks()[0];
            const sender = peerRef.current._senders?.find((s: any) => s.track.kind === 'video');
            if (sender) {
              sender.replaceTrack(videoTrack);
            }
          }
        }
        setIsScreenSharing(true);
      } else {
        if (stream) {
          const videoTrack = stream.getVideoTracks()[0];
          if (myVideo.current) {
            myVideo.current.srcObject = stream;
            if (peerRef.current) {
              const sender = peerRef.current._senders?.find((s: any) => s.track.kind === 'video');
              if (sender) {
                sender.replaceTrack(videoTrack);
              }
            }
          }
        }
        setIsScreenSharing(false);
      }
    } catch (error) {
      console.error('Error sharing screen:', error);
    }
  };

  const toggleRecording = () => {
    if (!isRecording) {
      if (stream) {
        const mediaRecorder = new MediaRecorder(stream);
        mediaRecorderRef.current = mediaRecorder;
        recordedChunksRef.current = [];

        mediaRecorder.ondataavailable = (event) => {
          if (event.data.size > 0) {
            recordedChunksRef.current.push(event.data);
          }
        };

        mediaRecorder.onstop = () => {
          const blob = new Blob(recordedChunksRef.current, {
            type: 'video/webm'
          });
          const url = URL.createObjectURL(blob);
          const a = document.createElement('a');
          document.body.appendChild(a);
          a.style.display = 'none';
          a.href = url;
          a.download = `interview-recording-${Date.now()}.webm`;
          a.click();
          window.URL.revokeObjectURL(url);
        };

        mediaRecorder.start();
        setIsRecording(true);
      }
    } else {
      if (mediaRecorderRef.current) {
        mediaRecorderRef.current.stop();
        setIsRecording(false);
      }
    }
  };

  const toggleAudio = () => {
    if (stream) {
      stream.getAudioTracks().forEach(track => {
        track.enabled = !isAudioEnabled;
      });
      setIsAudioEnabled(!isAudioEnabled);
    }
  };

  const toggleVideo = () => {
    if (stream) {
      stream.getVideoTracks().forEach(track => {
        track.enabled = !isVideoEnabled;
      });
      setIsVideoEnabled(!isVideoEnabled);
    }
  };

  const endMeeting = () => {
    if (stream) {
      stream.getTracks().forEach(track => track.stop());
    }
    if (peerRef.current) {
      peerRef.current.destroy();
    }
    if (mediaRecorderRef.current && isRecording) {
      mediaRecorderRef.current.stop();
    }
    
    if (user?.role === 'interviewer') {
      navigate('/interviewer/feedback', { 
        state: { 
          intervieweeId: selectedInterviewee?.id,
          intervieweeName: selectedInterviewee?.full_name
        }
      });
    } else {
      navigate('/interviewee/platform-feedback', {
        state: { meetingId }
      });
    }
  };

  if (showPerformanceCheck) {
    return <PerformanceCheck onComplete={() => {
      setShowPerformanceCheck(false);
      setShowInstructions(true);
    }} />;
  }

  if (showInstructions) {
    return <MeetingInstructions onAccept={() => setShowInstructions(false)} />;
  }

  return (
    <div 
      className={`min-h-screen ${isDarkMode ? 'bg-gray-900 text-white' : 'bg-gray-100 text-gray-900'} p-4`}
      onMouseMove={() => setIsControlsVisible(true)}
      onMouseLeave={() => setTimeout(() => setIsControlsVisible(false), 3000)}
    >
      <div className="max-w-6xl mx-auto">
        <div className={`grid ${viewMode === 'gallery' ? 'grid-cols-1 md:grid-cols-2' : 'grid-cols-1'} gap-4 mb-8`}>
          <div className="relative">
            <video
              ref={myVideo}
              autoPlay
              muted
              playsInline
              className={`w-full rounded-lg ${isDarkMode ? 'bg-gray-800' : 'bg-gray-200'} ${isCameraMirrored ? 'scale-x-[-1]' : ''}`}
            />
            <div className={`absolute bottom-4 left-4 ${isDarkMode ? 'bg-gray-900' : 'bg-white'} px-2 py-1 rounded`}>
              You ({user?.full_name})
            </div>
          </div>
          <div className={`relative ${viewMode === 'single' ? 'hidden' : ''}`}>
            {!peerConnected ? (
              <div className={`w-full h-full rounded-lg ${isDarkMode ? 'bg-gray-800' : 'bg-gray-200'} flex items-center justify-center`}>
                <p className={isDarkMode ? 'text-gray-400' : 'text-gray-600'}>
                  Waiting for peer to join...
                </p>
              </div>
            ) : (
              <video
                ref={peerVideo}
                autoPlay
                playsInline
                className={`w-full rounded-lg ${isDarkMode ? 'bg-gray-800' : 'bg-gray-200'}`}
              />
            )}
            <div className={`absolute bottom-4 left-4 ${isDarkMode ? 'bg-gray-900' : 'bg-white'} px-2 py-1 rounded`}>
              Peer
            </div>
          </div>
        </div>

        <div 
          className={`fixed bottom-8 left-1/2 transform -translate-x-1/2 flex justify-center space-x-4 ${
            isDarkMode ? 'bg-gray-800' : 'bg-white'
          } p-4 rounded-lg transition-opacity duration-300 ${
            isControlsVisible ? 'opacity-100' : 'opacity-0'
          }`}
        >
          <button
            onClick={toggleTheme}
            className={`p-4 rounded-full ${isDarkMode ? 'bg-gray-700' : 'bg-gray-100'}`}
            title={isDarkMode ? 'Light Mode' : 'Dark Mode'}
          >
            {isDarkMode ? <Sun size={24} /> : <Moon size={24} />}
          </button>
          <button
            onClick={toggleAudio}
            className={`p-4 rounded-full ${
              isAudioEnabled 
                ? (isDarkMode ? 'bg-gray-700' : 'bg-gray-100')
                : 'bg-red-600'
            }`}
            title={isAudioEnabled ? 'Mute' : 'Unmute'}
          >
            {isAudioEnabled ? <Mic size={24} /> : <MicOff size={24} />}
          </button>
          <button
            onClick={toggleVideo}
            className={`p-4 rounded-full ${
              isVideoEnabled
                ? (isDarkMode ? 'bg-gray-700' : 'bg-gray-100')
                : 'bg-red-600'
            }`}
            title={isVideoEnabled ? 'Stop Video' : 'Start Video'}
          >
            {isVideoEnabled ? <Video size={24} /> : <VideoOff size={24} />}
          </button>
          <button
            onClick={toggleScreenShare}
            className={`p-4 rounded-full ${
              isScreenSharing ? 'bg-green-600' : (isDarkMode ? 'bg-gray-700' : 'bg-gray-100')
            }`}
            title={isScreenSharing ? 'Stop Sharing' : 'Share Screen'}
          >
            <MonitorUp size={24} />
          </button>
          <button
            onClick={toggleRecording}
            className={`p-4 rounded-full ${
              isRecording ? 'bg-red-600' : (isDarkMode ? 'bg-gray-700' : 'bg-gray-100')
            }`}
            title={isRecording ? 'Stop Recording' : 'Start Recording'}
          >
            <Download size={24} />
          </button>
          <button
            onClick={() => setIsCameraMirrored(!isCameraMirrored)}
            className={`p-4 rounded-full ${isDarkMode ? 'bg-gray-700' : 'bg-gray-100'}`}
            title="Mirror Camera"
          >
            <FlipHorizontal size={24} />
          </button>
          <button
            onClick={() => setViewMode(viewMode === 'gallery' ? 'single' : 'gallery')}
            className={`p-4 rounded-full ${isDarkMode ? 'bg-gray-700' : 'bg-gray-100'}`}
            title="Change View"
          >
            {viewMode === 'gallery' ? <LayoutGrid size={24} /> : <Layout size={24} />}
          </button>
          <button
            onClick={endMeeting}
            className="p-4 rounded-full bg-red-600"
            title="End Meeting"
          >
            <PhoneOff size={24} />
          </button>
        </div>
      </div>
    </div>
  );
}