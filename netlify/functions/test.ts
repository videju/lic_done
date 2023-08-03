import type { Handler, HandlerEvent, HandlerContext } from '@netlify/functions'
export const handler: Handler = async (event:HandlerEvent,context:HandlerContext)=> {
    return {statusCode:200,body:JSON.stringify("s")
}
}