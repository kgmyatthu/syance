export const API_KEY = "Fo5SJqhalRdYKBqDqbNDX5VwkKto2RL8mK9174LI"; //This is a client-side application Couldn't hide api key anyway, so not gonna hide. it
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
    NEO:({sstr}={}) =>{
        if(sstr){
            return `/neo/${sstr}`
        }
        return `/neo`
    }

}

// /
// /apod
// /sentry
// /sentry/:obj_des
// /neos/:sstr 