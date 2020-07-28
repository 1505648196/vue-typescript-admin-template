import { RouteConfig } from "vue-router";
import Layout from "@/layout/index.vue";

export const playerRouter: RouteConfig ={
    path: '/players',
    component: Layout,
    redirect:'/players/list',
    meta:{
        title:'playerMgt', //i8n信息需要额外处理
        icon:'gameplayer'  //图标选取
    },
    children:[
        {
            path: 'list',
            component: () => import ('@/views/player/list.vue'),
            name: 'PlayerList',
            meta:{               
                title: 'playerList', //i18n信息需要额外处理
                icon: 'gameplayer' //图标选取
            }
        }
    ]


}