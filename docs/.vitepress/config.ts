import { defineConfig } from 'vitepress'

export default defineConfig({
  title: 'Walkthrough Kit',
  description: 'Generate interactive code walkthroughs from markdown',
  base: '/walkthrough-kit/',

  themeConfig: {
    nav: [
      { text: 'Guide', link: '/guide/' },
      { text: 'GitHub', link: 'https://github.com/caseyrfsmith/walkthrough-kit' }
    ],

    sidebar: [
      {
        text: 'Introduction',
        items: [
          { text: 'What is Walkthrough Kit?', link: '/guide/' },
          { text: 'Getting started', link: '/guide/getting-started' }
        ]
      },
      {
        text: 'Usage',
        items: [
          { text: 'CLI commands', link: '/guide/cli' },
          { text: 'Markdown syntax', link: '/guide/markdown' },
          { text: 'React component', link: '/guide/component' }
        ]
      },
      {
        text: 'Customization',
        items: [
          { text: 'Styling', link: '/guide/styling' },
          { text: 'Custom languages', link: '/guide/custom-languages' },
          { text: 'Customize LLM Parser', link: '/guide/custom-llm-parser' }
        ]
      },
      {
        text: 'Examples',
        link: '/guide/examples'
      }
    ],

    socialLinks: [
      { icon: 'github', link: 'https://github.com/caseyrfsmith/walkthrough-kit' }
    ],

    footer: {
      message: 'Released under the MIT License.',
      copyright: 'Built for tech writers by CT Smith.'
    }
  }
})
