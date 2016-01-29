import {MessageModel} from 'app/chat/model/message_model.js';
import {MentionService} from 'app/chat/chat_list/mention_service.js';
import {UserStorageService} from 'app/user/user_storage_service.js';

export class NotificationNewMessagesService {
  public static DEFAULT_TITLE: string = '_';
  public static REPEATER: number = 555;
  public static DEFAULT_NOTIFICATION_MESSAGE: string = "<Não escreveu mensagem alguma ainda...>";//ainda nao usado
  
  private _storageService: UserStorageService = new UserStorageService();

  private _doc: Document = document;
  private _mentionService: MentionService = new MentionService();

  private notification: Notification = null;
  private hasBeenNotified: boolean = false;
  
  constructor() {
    this._doc.title = NotificationNewMessagesService.DEFAULT_TITLE;
  }

  toggleTitle(m: MessageModel):void {
  
    let _idInterval = setInterval(() => {

      let _warning = (this._mentionService.wasUserOnlineMentioned(m)) ? '@' : '!';

      this._doc.title = (this._doc.title === _warning) ? NotificationNewMessagesService.DEFAULT_TITLE : _warning;

      if (this._doc.hasFocus()) {
          this._doc.title = NotificationNewMessagesService.DEFAULT_TITLE;
		  if (this.notification != null){
			this.notification.close();
			this.hasBeenNotified = false;
		  }
			
          clearInterval(_idInterval);
      }

    }, NotificationNewMessagesService.REPEATER);
	
	if (
		!!Notification && 
		this._mentionService.wasUserOnlineMentioned(m) && 
		!this._mentionService.isSelfMention(m) &&
		!this._doc.hasFocus() &&
		!this.hasBeenNotified
	)
		this.sendNotificationYell(m);
  }
  
  sendNotificationYell(m: MessageModel):void {
	if (Notification.permission === "granted"){
		let message = m.message.replace("@"+this._storageService.getUserName(), "");
		
		this.notification = new Notification(m.user + " esta carente e quer sua atenção!", {
		  icon: './favicon.ico',
		  body: message
		});
		this.notification.onclick = function(){
			window.focus();
			//Abaixo ocorre um erro, fazendo com que o valor nao seja definido e o campo mande uma mensagem vazia apos a primeira vez
			/*
			let _input = window.document.getElementById("main-input-chat");
			_input.value = "";
			_input.focus();
			_input.value = "@"+m.user+" ";
			*/
			
		};
		this.hasBeenNotified = true;
	}
	else {
		checkAndRequestNotificationPermission();
	}
  }
  
  checkAndRequestNotificationPermission():void{
	if (Notification.permission !== "granted")
		Notification.requestPermission();
  }
}
