import { defineCollection, z } from 'astro:content';
import { glob } from 'astro/loaders';

// 博客文章集合
const blog = defineCollection({
    loader: glob({ pattern: '**/[^_]*.{md,mdx}', base: "src/content/blog" }),
    schema: z.object({
        lang: z.enum(['ja', 'en']).default('ja'),
        title: z.string(),
        summary: z.string().optional(),
        date: z.string(),
        category: z.string(),
        tags: z.array(z.string()),
        coverImage: z.string(),
        featured: z.boolean().default(false),
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
        image: z.string(),
        date: z.string(),
        location_tag: z.string(),
        year_tag: z.string(),
        collection_tag: z.string(),
        featured: z.boolean().default(false),
        gear: z.string().optional(),
        exif: z.object({
            camera: z.string().optional(),
            aperture: z.string().optional(),
            shutter: z.string().optional(),
            iso: z.string().optional(),
        }).optional(),
    }),
});

// 视频作品集合 (新增)
const videos = defineCollection({
    loader: glob({ pattern: '**/[^_]*.{md,mdx,json,yaml}', base: "src/content/videos" }),
    schema: z.object({
        lang: z.enum(['ja', 'en']).default('ja'),
        title: z.string(),
        desc: z.string().optional(),
        image: z.string(), // 封面图 URL 或 Unsplash ID
        tags: z.array(z.string()).default([]),
        duration: z.string().optional(),
        category: z.string().optional(),
        views: z.string().optional(),
        date: z.string(),
        featured: z.boolean().default(false),
        type: z.enum(['long', 'short']).default('long'), // 区分长视频和短片
        url: z.string().optional(), // 视频播放链接
    }),
});

export const collections = { blog, photos, videos };