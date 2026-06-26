import { defineField, defineType } from 'sanity';

export const resourceType = defineType({
  name: 'resource',
  title: 'PDF 资源',
  type: 'document',
  fields: [
    defineField({ name: 'title', title: '资源名称', type: 'string', validation: (rule) => rule.required() }),
    defineField({
      name: 'slug',
      title: '页面标识',
      type: 'slug',
      options: { source: 'title' },
      description: '饮食记录使用 food-log，训练计划使用 training-plan。',
      validation: (rule) => rule.required()
    }),
    defineField({ name: 'description', title: '资源介绍', type: 'text', rows: 3 }),
    defineField({ name: 'cover', title: '封面图片', type: 'image', options: { hotspot: true } }),
    defineField({ name: 'file', title: 'PDF 文件', type: 'file', options: { accept: 'application/pdf' } }),
    defineField({ name: 'externalUrl', title: '外部链接', type: 'url' }),
    defineField({ name: 'order', title: '显示顺序', type: 'number', initialValue: 10 }),
    defineField({ name: 'published', title: '在网站显示', type: 'boolean', initialValue: true })
  ],
  preview: {
    select: { title: 'title', subtitle: 'description', media: 'cover' }
  }
});
