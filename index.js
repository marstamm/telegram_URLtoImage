"use strict";

// include the node.js native http package
var http = require('http');
var https = require('https');

// Include TelegramBot package
var TelegramBot = require('node-telegram-bot-api');

// Telegram bot token (given when you create a new bot using the BotFather);
const BotToken = require('./token');

// Telegram bot setup
var telegramBot = new TelegramBot(BotToken, {polling: false});

exports.handler = function(event, context, lambdaCallback) {

    // parse the chat ID so we can respond
    let chatId;
    let reply;
    let message;

    if (event.body.message && event.body.message.chat && event.body.message.chat.id) {
      chatId = event.body.message.chat.id;
    } else if (event.body.channel_post && event.body.channel_post.chat && event.body.channel_post.chat.id) {
      chatId = event.body.channel_post.chat.id;
    }
    else {
      return;
    }

    if (event.body.channel_post && event.body.channel_post.text) {
      message = event.body.channel_post.text;
    } else if (event.body.message && event.body.message.text) {
      message = event.body.message.text;
    }

    telegramBot.sendPhoto(chatId, message, {caption: message});

    return;
}
