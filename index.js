const TelegramApi =require('node-telegram-bot-api')
const {gameOptions, againOptions} = require('./options')
const token= "6108925925:AAG1tIIq1Yf_musJPSp5CV4PLuh92GNuADE"
const bot=new TelegramApi(token, {polling: true})
const chats={}

const startGame = async (chatId) => {
    await bot.sendMessage(chatId, `Сейчас я загадаю цифру от 0 до 9, а ты должен ее угадать!`);
    const randomNumber = Math.floor(Math.random() * 10)
    chats[chatId] = randomNumber;
    await bot.sendMessage(chatId, 'Отгадывай', gameOptions);
}
const start =()=> {
    bot.setMyCommands([{command: "/start", description: "Начальное приветствие"},
    {command: "/info", description: "получить инфу"},
    {command: "/game", description: "Погадай"}
])
   
    
    bot.on('message', async msg=> {
        const text=msg.text
        const chatId=msg.chat.id
        
        console.log(msg)
        if(text==="/start"){
           await  bot.sendMessage(chatId, `Хабибабудже ${chatId}!`)
           await  bot.sendSticker(chatId, "https://chpic.su/_data/stickers/s/ShrekMadeByNeuralNetwork/ShrekMadeByNeuralNetwork_014.webp" )
           return "ну вот как это понимать"
        }
        if(text==="/info"){
           await  bot.sendMessage(chatId, `А вот не скажу`)
           return "ну вот как это понимать"
        }
        if(text==="/game"){
            return startGame(chatId);
        } 
       return bot.sendMessage(chatId, "И вот как это понимать?")
    })
    bot.on('callback_query', async msg => {
        const data = msg.data;
        const chatId = msg.message.chat.id;
        if (data === '/again') {
            return startGame(chatId)
        }
        if (data == chats[chatId]) {
          //  user.right += 1;
            await bot.sendMessage(chatId, `Поздравляю, ты отгадал цифру ${chats[chatId]}`, againOptions);
        } else {
          //  user.wrong += 1;
            await bot.sendMessage(chatId, `К сожалению ты не угадал, бот загадал цифру ${chats[chatId]}`, againOptions);
        }
       
    
    })
}
start() 

/*
const TelegramApi = require('node-telegram-bot-api')
const {gameOptions, againOptions} = require('./options')
const sequelize = require('./db');
const UserModel = require('./models');

const token = '6108925925:AAG1tIIq1Yf_musJPSp5CV4PLuh92GNuADE'

const bot = new TelegramApi(token, {polling: true})

const chats = {}


const startGame = async (chatId) => {
    await bot.sendMessage(chatId, `Сейчас я загадаю цифру от 0 до 9, а ты должен ее угадать!`);
    const randomNumber = Math.floor(Math.random() * 10)
    chats[chatId] = randomNumber;
    await bot.sendMessage(chatId, 'Отгадывай', gameOptions);
}

const start = async () => {

    bot.setMyCommands([
        {command: '/start', description: 'Начальное приветствие'},
        {command: '/info', description: 'Получить информацию о пользователе'},
        {command: '/game', description: 'Игра угадай цифру'},
    ])

    bot.on('message', async msg => {
        const text = msg.text;
        const chatId = msg.chat.id;

        try {
            if (text === '/start') {
                await UserModel.create({chatId})
                await bot.sendSticker(chatId, 'https://tlgrm.ru/_/stickers/ea5/382/ea53826d-c192-376a-b766-e5abc535f1c9/7.webp')
                return bot.sendMessage(chatId, `Добро пожаловать в телеграм бот автора ютуб канала ULBI TV`);
            }
            if (text === '/info') {
                const user = await UserModel.findOne({chatId})
                return bot.sendMessage(chatId, `Тебя зовут ${msg.from.first_name} ${msg.from.last_name}, в игре у тебя правильных ответов ${user.right}, неправильных ${user.wrong}`);
            }
            if (text === '/game') {
                return startGame(chatId);
            }
            return bot.sendMessage(chatId, 'Я тебя не понимаю, попробуй еще раз!)');
        } catch (e) {
            return bot.sendMessage(chatId, 'Произошла какая то ошибочка!)');
        }

    })

    bot.on('callback_query', async msg => {
        const data = msg.data;
        const chatId = msg.message.chat.id;
        if (data === '/again') {
            return startGame(chatId)
        }
    
    })
}

start() */
//npm init -y
//npm i node-telegram-bot-api nodemon
// npm run dev 