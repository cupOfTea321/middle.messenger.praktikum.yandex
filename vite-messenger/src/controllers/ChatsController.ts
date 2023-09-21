import API, { ChatsAPI } from '../api/ChatsAPI';
import store from '../utils/Store';
import MessagesController from './MessagesController';
import {unregisterDecorator} from "handlebars";

class ChatsController {
  private readonly api: ChatsAPI;

  constructor() {
    this.api = API;
  }

  async create(title: string) {
    await this.api.create(title);
    console.log('create')
    await this.fetchChats();
  }

  async fetchChats() {
    const chats = await this.api.read();

    chats.map(async (chat) => {
      const token = await this.getToken(chat.id);

      await MessagesController.connect(chat.id, token);
    });

    store.set('chats', chats);
  }

  addUserToChat(id: number, userId: number) {
    this.api.addUsers(id, [userId]);
  }

  async delete(id: number) {
    await this.api.delete(id);

    this.fetchChats();
    store.set('selectedChat', null);
  }

  getToken(id: number) {
    return this.api.getToken(id);
  }

  async addAvatar(id:any, avatar:any) {
    try {
      const file: FormData = new FormData();
      file.append('avatar', avatar);
      file.append('chatId', id);
      console.log(avatar)
      await this.api.addChatAvatar(file).then( (data: any) => {
            const chatIndex = store.getState().chats.findIndex((chat: any) => chat.id === id);
            const currentChats = store.getState().chats;

            const updatedChat = { ...currentChats[chatIndex], avatar: data.avatar };

            currentChats[chatIndex] = updatedChat;

            store.set('chats', currentChats);
          }
      );
    } catch (e: any) {
      console.error(e);
    }
  }

  selectChat(id: number) {
    console.log('selectChat')
    store.set('selectedChat', id);
  }

  selectChatName(name: string) {
    store.set('selectedChatName', name);
  }
}

const controller = new ChatsController();

// @ts-ignore
window.chatsController = controller;

export default controller;
