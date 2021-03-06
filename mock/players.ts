import { Response,Request } from "express";
import { Player, Hero } from '../src/api/types';
import faker from "faker";
import { heros } from './heros';

    // const {id} = req.params
    // for (let index = 0; index < array.length; index++) {
    //     const element = array[index];
        
    // }
    faker.locale = 'zh_CN'

    //模拟用户数据
    const playerCount = 100
    const playerList: Player[] =[]
    
    for (let i = 1; i < playerCount; i++) {
        playerList.push({
            id:i,
            accountname:faker.name.findName(),        
            avatar:faker.image.avatar(),
            bravepoints:faker.random.number(1000),
            exp:faker.random.number(10000), //! 用户经验值
            level:faker.random.number(30), //! 用户登记
            nickname:faker.name.findName(),        
            rank:faker.random.number(200), //! 排位赛段位        
            wanttoplay:Array.from(genWantoplay()),
            winningstreak:faker.random.number(10),
        
        })
        
    }

    function genWantoplay() {
        let wanttoplay: Set<Hero> = new Set();
        while (wanttoplay.size<3) {
            wanttoplay.add(heros[faker.random.number(9)])
        }
        return wanttoplay;
    }

    export const getPlayers = (req: Request, res: Response) => {
   
      
      // 从查询参数中获取分页、过滤关键词等参数
      const { accountname, page = 1, limit = 10 }:any = req.query
    
      // 过滤
      let mockList = playerList.filter(item => {
        if (accountname && item.accountname.indexOf(accountname) < 0) {
          return false
        }
        return true
      })
    
    
      // 分页
      const pageList = mockList.filter((item, index) => index < limit * page && index >= limit * (page - 1))
    
      res.json({
        code: 20000,
        data: {
          total: mockList.length,
          players:pageList 
        }
      })
    }
    
    export const getPlayer = (req: Request, res: Response) => {
      const {id} = req.params
      for(const player of playerList) {
        if (player.id.toString() === id) {
          return res.json({
            code: 20000,
            data: {
              player
            }
          })
        }
      }
    
      // 没找到响应数据，报错
      res.json({
        code: 70001,
        message: '没有找到相应的玩家信息'
      })
    }

    export const createPlayer = (req: Request,res: Response)=>{
      const { player } = req.body
      return res.json({
        code:20000,
        data:{
          player
        }
      })
    }

    export const updatePlayer = (req:Request,res: Response) =>{
      const { id } = req.params
      const { player } = req.body
      for (const v of playerList) {
        if (v.id.toString()===id) {
          return res.json({
            code : 20000,
            data:{
              player
            }
          })
        }
      }
      return res.json({
        code:70001,
        message:'player not found',
      })
    }

    export const deletePlayer = (req: Request,res: Response)=>{
      return res.json({
        code:20000,
      })
    }


    


