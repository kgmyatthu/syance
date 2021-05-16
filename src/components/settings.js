export const API_KEY = "Fo5SJqhalRdYKBqDqbNDX5VwkKto2RL8mK9174LI"; //This is a client-side application Couldn't hide api key anyway, so not gonna hide. it
export const URLS = {
    APOD_ROOT:"/apod",
    SENTRY: (obj_des) =>{
        if (obj_des){
            return `/sentry/${obj_des}`
        }
        return '/sentry'
    }
}

// /
// /apod
// /sentry
// /sentry/:obj_des
// /neos/:sstr 