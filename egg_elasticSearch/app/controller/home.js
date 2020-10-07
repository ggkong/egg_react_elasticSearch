'use strict';

const Controller = require('egg').Controller;

class HomeController extends Controller {
  async index() {
    const { ctx } = this;
    const result = await this.app.elasticsearch.search({
      index: 'kongge',
      body: {
        query: {
          match: {
            desc: 'bird',
          },
        },
      },
    });
    // 将数据 进行清洗
    // 封装成 可以用到的对象
    console.log(result.hits.hits[0]);
    ctx.body = result;
  }

  async search() {
    
    const { searchValue } = await this.ctx.request.body;
    console.log(`后台请求到的数据${searchValue}`)
    const result = await this.app.elasticsearch.search({
      index: 'kongge',
      body: {
        query: {
          match: {
            desc: searchValue,
          },
        },
        "highlight": {
          "pre_tags": "<span style='color:red'>",
          "post_tags": "</span>", 
          "fields": {
            "desc": {}
          }
        }
      },
    });
    // 返回的结果
    console.log(result.hits.hits)
    this.ctx.body = {data: result.hits.hits}  
    
  }

  async addtoes() {
    // 获取 header 内的参数
    const { name, age, desc } = this.ctx.request.body;
    console.log(desc);
    await this.app.elasticsearch.bulk({
      body: [
        { index: { _index: 'kongge', _type: 'user', _id: '11111' } },
        {
          name,
          age,
          desc,
        },
      ],
    });

    // console.log(this.ctx.request.header.name)
    this.ctx.body = {
      name, age, desc,
    };
  }
}

module.exports = HomeController;
