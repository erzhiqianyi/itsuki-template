import { defineCollection, z } from 'astro:content';
import { glob } from 'astro/loaders';

/**
 * Astro 5.0 内容集合配置中心
 * * 此文件定义了项目中所有内容的 Schema 结构，确保：
 * 1. blog: 支持多语言、系列文章、分类过滤及精选推荐。
 * 2. photos: 支持多语言标题/地点、本地与远程图片兼容、多维度过滤标签以及 EXIF 信息。
 */

// 博客文章集合
const blog = defineCollection({
    loader: glob({ pattern: '**/[^_]*.{md,mdx}', base: "src/content/blog" }),
    schema: z.object({
        // 语言标识
        lang: z.enum(['ja', 'en']).default('ja'),

        // 基础元数据
        title: z.string(),
        summary: z.string().optional(),
        date: z.string(),
        category: z.string(),
        tags: z.array(z.string()),
        coverImage: z.string(),

        // 是否为精选文章（用于列表页侧边栏推荐）
        featured: z.boolean().default(false),

        // 系列文章逻辑
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

// 摄影作品集合
const photos = defineCollection({
    loader: glob({ pattern: '**/[^_]*.{md,mdx}', base: "src/content/photos" }),
    schema: z.object({
        lang: z.enum(['ja', 'en']).default('ja'),
        title: z.record(z.string()),
        location: z.record(z.string()),

        // 资源路径 (支持 /assets/photos/ 的本地路径或 CDN URL)
        image: z.string(),
        date: z.string(), // YYYY-MM-DD

        // 过滤器专用标签 (用于 photos.astro 顶部的逻辑)
        location_tag: z.string(),    // 地点 ID
        year_tag: z.string(),        // 年份 ID
        collection_tag: z.string(),  // 集合/类型 ID

        // 是否为精选图片
        featured: z.boolean().default(false),

        // 拍摄参数
        gear: z.string().optional(), // 器材 (如：X100V)
        exif: z.object({
            camera: z.string().optional(),
            aperture: z.string().optional(),
            shutter: z.string().optional(),
            iso: z.string().optional(),
        }).optional(),
    }),
});

// 统一导出集合
export const collections = { blog, photos };