import fetch from 'node-fetch';

let handler = async (m, { conn, args, text, usedPrefix, command }) => {
  let chat = global.db.data.chats[m.chat];
  if (!chat.nsfw)
    throw `💝 QUEEN HENTAI 💝  does not support NSFW.\n\nTo turn it on, use: ${usedPrefix}on nsfw \n\n🤤🤤🤤🤤🤤🤤🤤🤤🤤`;

  let user = global.db.data.users[m.sender].age;
  if (user < 17)
    throw `Bza,18+ hode. 😁 Age must be 18`;

  if (!text)
    throw `💝 QUEEN HENTAI 💝 , What do you want to search on 💝 QUEEN HENTAI 💝?\n🕸️ Usage: ${usedPrefix + command} <search>\n\nEx:Mia කලීපා 🤣  or bza can use a link \nEx: .xnxx link *`;

  m.react(rwait);
  
  
    // Check if the input is a valid Xvideos URL
    const isURL = /^(https?:\/\/)?(www\.)?xvideos\.com\/.+$/i.test(text);
  
    try {
      if (isURL) {
        // If it's a valid URL, directly download the video
        const result = await xvideosdl(text);
        const { title, url } = result.result;
  
        // Send the video file
        const response = await fetch(url);
        const buffer = await response.arrayBuffer();
  
        conn.sendFile(
          m.chat,
          Buffer.from(buffer),
          `${title}.mp4`,
          `Here is your Xvideos video: ${title}`
        );
  
      } else {
        // If it's not a valid URL, perform a search and display the search results
        const results = await xvideosSearch(text);
        if (results.length === 0) {
          m.reply('No search results found for the given query.');
        } else {
          const searchResults = results.map((result, index) => {
            return `${index + 1}. *${result.title}*\nDuration: ${result.duration}\nQuality: ${result.quality}\nURL: ${result.url}`;
          }).join('\n\n');
  
          m.reply(`*Search Results for "${text}":*\n\n${searchResults}`);
        }
      }
    } catch (error) {
      console.error(error);
      throw 'Failed to fetch Xvideos video details.';
    }
  };

  handler.help = ['xvid']
  handler.tags = ['nsfw']
handler.command = ['xvid'];
handler.group = false;
handler.premium = false;
handler.register = false;

handler.premium = false;

export default handler;
