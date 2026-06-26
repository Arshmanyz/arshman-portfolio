import { defineField, defineType } from 'sanity';

export const siteSettingsType = defineType({
  name: 'siteSettings',
  title: '网站设置',
  type: 'document',
  fields: [
    defineField({ name: 'brandName', title: '品牌名称', type: 'string', initialValue: 'Arshman' }),
    defineField({
      name: 'homeTitle',
      title: '首页大字',
      type: 'string',
      initialValue: 'VarshVia'
    }),
    defineField({
      name: 'homeBackground',
      title: '首页背景图',
      type: 'image',
      options: { hotspot: true }
    }),
    defineField({ name: 'tagline', title: '首页介绍', type: 'string' }),
    defineField({ name: 'email', title: '联系邮箱', type: 'email' }),
    defineField({ name: 'footerText', title: '页脚文字', type: 'string' })
  ],
  preview: {
    prepare: () => ({ title: '网站设置' })
  }
});
