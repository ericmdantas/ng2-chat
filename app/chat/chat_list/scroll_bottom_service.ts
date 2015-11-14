export class ScrollBottomService {
  private _chatContainer: Element = document.getElementById("chat");

  goDown() {
    this._chatContainer.scrollTop = this._chatContainer.scrollHeight;
  }
}
