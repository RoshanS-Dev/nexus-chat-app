import { io } from 'socket.io-client';

const SOCKET_URL = import.meta.env.VITE_SOCKET_URL;

class SocketService {
  constructor() {
    this.socket = null;
    this.listeners = new Map();
    this.joinedRooms = new Set();
  }

  connect(token) {
    if (this.socket?.connected) return;

    this.socket = io(SOCKET_URL, {
      auth: { token },
      reconnection: true,
      reconnectionDelay: 1000,
      reconnectionAttempts: 5,
    });

    // Rebind all registered listeners
    this.listeners.forEach((callbacks, event) => {
      callbacks.forEach((callback) => {
        this.socket.on(event, callback);
      });
    });

    this.socket.on('connect', () => {
      console.log('Socket connected');
      // Rejoin all rooms
      this.joinedRooms.forEach((roomId) => {
        this.socket.emit('join_room', roomId);
      });
    });

    this.socket.on('disconnect', () => {
      console.log('Socket disconnected');
    });

    this.socket.on('connect_error', (error) => {
      console.error('Socket connection error:', error);
    });
  }

  disconnect() {
    if (this.socket) {
      this.socket.disconnect();
      this.socket = null;
    }
    this.listeners.clear();
    this.joinedRooms.clear();
  }

  on(event, callback) {
    if (!this.listeners.has(event)) {
      this.listeners.set(event, new Set());
    }
    this.listeners.get(event).add(callback);

    if (this.socket) {
      this.socket.on(event, callback);
    }
  }

  off(event, callback) {
    if (event) {
      if (callback) {
        if (this.listeners.has(event)) {
          this.listeners.get(event).delete(callback);
        }
        if (this.socket) {
          this.socket.off(event, callback);
        }
      } else {
        this.listeners.delete(event);
        if (this.socket) {
          this.socket.off(event);
        }
      }
    }
  }

  emit(event, data) {
    if (this.socket) {
      this.socket.emit(event, data);
    }
  }

  joinRoom(roomId) {
    if (roomId) {
      this.joinedRooms.add(roomId);
      this.emit('join_room', roomId);
    }
  }

  leaveRoom(roomId) {
    if (roomId) {
      this.joinedRooms.delete(roomId);
      this.emit('leave_room', roomId);
    }
  }

  sendMessage(data) {
    this.emit('send_message', data);
  }

  sendGroupMessage(data) {
    this.emit('send_group_message', data);
  }

  sendTyping(receiverId, isTyping) {
    if (isTyping) {
      this.emit('typing', { receiverId, isTyping: true });
    } else {
      this.emit('stop_typing', { receiverId });
    }
  }

  sendGroupTyping(groupId, isTyping) {
    if (isTyping) {
      this.emit('group_typing', { groupId, isTyping: true });
    } else {
      this.emit('stop_group_typing', { groupId });
    }
  }

  // Poll methods
  onPollUpdated(callback) {
    this.on('poll_updated', callback);
  }

  offPollUpdated(callback) {
    this.off('poll_updated', callback);
  }

  // Online status methods
  onUserStatusUpdate(callback) {
    this.on('user_status_update', callback);
  }

  offUserStatusUpdate(callback) {
    this.off('user_status_update', callback);
  }

  onUserOffline(callback) {
    this.on('user_offline', callback);
  }

  offUserOffline(callback) {
    this.off('user_offline', callback);
  }
}

export default new SocketService();
