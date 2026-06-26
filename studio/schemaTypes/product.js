import { defineField, defineType } from 'sanity';

export const productType = defineType({
  name: 'product',
  title: '产品',
  type: 'document',
  fields: [
    defineField({ name: 'title', title: '产品名称', type: 'string', validation: (rule) => rule.required() }),
    defineField({
      name: 'slug',
      title: '页面标识',
      type: 'slug',
      options: { source: 'title' },
      description: '首次设置后不要随意修改。',
      validation: (rule) => rule.required()
    }),
    defineField({ name: 'description', title: '产品介绍', type: 'text', rows: 4 }),
    defineField({
      name: 'status',
      title: '当前状态',
      type: 'string',
      options: {
        list: [
          { title: '开发中', value: '开发中' },
          { title: '构建中', value: '构建中' },
          { title: '内测中', value: '内测中' },
          { title: '已上线', value: '已上线' }
        ],
        layout: 'radio'
      }
    }),
    defineField({ name: 'image', title: '产品展示图片', type: 'image', options: { hotspot: true } }),
    defineField({ name: 'ctaLabel', title: '按钮文字', type: 'string' }),
    defineField({ name: 'url', title: '产品链接', type: 'url' }),
    defineField({ name: 'order', title: '显示顺序', type: 'number', initialValue: 10 }),
    defineField({ name: 'published', title: '在网站显示', type: 'boolean', initialValue: true })
  ],
  preview: {
    select: { title: 'title', subtitle: 'status', media: 'image' }
  }
});
