export default {

  // 可以结合读取来做 publish
  findOne: {},
  find: {},

  insert: {
    posts: {
      admin: true,
      moderator: true,
      author: true,
      contributor: true,
      user: {
        allow: ['title']
      },
    },
  },

  // update: {
  //   posts: {
  //     admin: true,
  //     moderator: {
  //       allow: ['categories'],
  //     },
  //     author: {
  //       allowSelf: ['title', 'content', 'summary', { status: ['open', 'draft', 'close'] }],
  //     },
  //     contributor: {
  //       allow: ['revise'],
  //     },
  //     user: {
  //       allow: false,
  //     },
  //   },

  //   comments: {
  //     admin: true,
  //   }
  // },

  // remove: {
  //   posts: {
  //     admin: true,
  //     moderator: true,
  //     author: 'self',
  //   }
  // }

}
