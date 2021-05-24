export const API_KEY = "Fo5SJqhalRdYKBqDqbNDX5VwkKto2RL8mK9174LI"; //This is a client-side application Couldn't hide api key anyway, so not gonna hide it
export const URLS = {
    APOD:({start_date=null, end_date=null} = {})=>{
        if(start_date && end_date){
            return `/apod/${start_date}/${end_date}`
        }
        return `/apod`
    },
    SENTRY: ({obj_des=null}={}) =>{
        if (obj_des){
            return `/sentry/${obj_des}`
        }
        return '/sentry'
    },
    NHATS:() =>{
        return `/nhats`
    },
    ORBIT:({sstr}={})=>{
        if(sstr){
            return `/orbit/${sstr}`
        }
        return `/orbit`
    },
    ABOUT: ()=>{
        return `/about`
    }

}

// /
// /apod
// /sentry
// /sentry/:obj_des
// /nhats
// /nhats/:sstr 