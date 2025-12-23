import { defineCollection, z } from 'astro:content';
import { glob } from 'astro/loaders';

/**
 * Astro 5.0 内容集合配置
 * 注意：此文件定义数据结构，不直接生成 HTML。
 * 生成文件需要 src/pages/ 下的路由模板配合。
 */

const blog = defineCollection({
    // 修正：base 路径建议使用相对于项目根目录的路径
    loader: glob({ pattern: '**/[^_]*.{md,mdx}', base: "src/content/blog" }),
    schema: z.object({
        // 显式定义语言标识，默认为日语 'ja'
        lang: z.enum(['ja', 'en']).default('ja'),

        // 文章标题
        title: z.string(),

        // 文章摘要
        summary: z.string().optional(),

        // 发布日期
        date: z.string(),

        // 分类标识
        category: z.string(),

        // 标签列表
        tags: z.array(z.string()),

        // 封面图 URL
        coverImage: z.string(),

        // 系列文章配置
        series: z.object({
            title: z.record(z.string()),
            items: z.array(z.object({
                title: z.record(z.string()),
                href: z.string(),
                active: z.boolean()
            }))
        }).optional(),
    }),
});

export const collections = { blog };