import type { Handler, HandlerEvent, HandlerContext } from "@netlify/functions";

const notify = async(message: string) => {
  const body = {
    content: message,
    embeds: [
      {
        image: { url: 'https://media.giphy.com/media/v1.Y2lkPTc5MGI3NjExNTVmYzFhdGNrajJsY3ZjaWFzbjZnZmg0a3Y4YWEzaWg5dG5raWh5cSZlcD12MV9pbnRlcm5hbF9naWZfYnlfaWQmY3Q9Zw/6WMMlu1pQlZHlqGpQx/giphy.gif' }
      }
    ]
  };

  const response = await fetch(process.env.DISCORD_WEBHOOK_URL ?? '', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(body),
  });

  if (!response.ok) {
    console.log('Error sending message to discord');
    return false;
  }

  return true;
}

const handler: Handler = async (event: HandlerEvent, context: HandlerContext) => {
  await notify('Hola mundo desde Netlify Dev');

  return {
    statusCode: 200,
    body: JSON.stringify({
      message: 'Done'
    }),
    headers: {
      'Content-Type': 'application/json'
    }
  }
}

export { handler };
