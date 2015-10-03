export const events = {
  CONNECTION: 'connection',
  DISCONNECT: 'disconnect',
  MESSAGE: 'msg',
  LOGIN: 'login',
  TYPING: 'typing',
  MESSAGE_COUNT: 'msg_count',
  USER_CONNECTED: 'user_connected',
  USER_DISCONNECTED: 'user_disconnected',
  PEOPLE_ONLINE: 'people_online'
}

type MessageType = {
  message: string;
  user: string;
  sentAt: string;
  bot: boolean;
}

export const mention = {
  AT: '@',
  SLASH: '/',
  EVERYBODY: 'all'
}
