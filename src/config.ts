export const siteConfig = {
  title: "小赵的小工坊",
  copyright: "© EricZhao All Rights Reserved.",
  icp: "浙ICP备2026008960号-2",
  psb: "浙公网安备33010202005482号"
};

export interface NavLink {
  name: string;
  url: string;
}

export const navLinks: NavLink[] = [
  { name: "🔮 主页", url: "https://www.ericzhao3366.work/" },
  { name: "📚 博客", url: "https://blog.ericzhao3366.work/" },
  { name: "✨ 友链", url: "https://www.ericzhao3366.work/#friend" },
];

export interface Project {
  id: string;
  name: string;
  description: string;
  link: string;
  image: string;
  align: 'left' | 'right';
  language?: string;
  languageColor?: string;
}

export const projects: Project[] = [
  {
    id: "1",
    name: "电影拼贴生成器",
    description: "把片名变成一张图片，适合用作年终总结等",
    link: "/project/generate_collage.html",
    image: "/bianqian.png",
    align: 'left',
    language: 'HTML',
    languageColor: '#3178c6'
  },
  {
    id: "2",
    name: "图云生成器",
    description: "图片拼贴画",
    link: "/project/imagecloud.html",
    image: "/pintiehua.png",
    align: 'right',
    language: 'HTML',
    languageColor: '#3178c6'
  },
  {
    id: "3",
    name: "电影节地图",
    description: "电影节地图，方便查询转场路线等",
    link: "https://map.ericzhao3366.work/",
    image: "/dyjdt.png",
    align: 'left',
    language: 'WEB+微信小程序',
    languageColor: '#f1e05a'
  },
  {
    id: "4",
    name: "ASTRO主题Hozokura",
    description: "自己的一个博客主题，基于Astro",
    link: "https://github.com/ERIC-ZHAO-3366/hozokura",
    image: "/hozokura.png",
    align: 'right',
    language: 'Astro',
    languageColor: '#66ff00'
  }
];