export default {
	title: 'Pendora',
	lang: 'en-US',
	description: 'Declarative syntax for producing multiplatform wrappers and SDKs for REST APIs from a single codebase.',
    themeConfig: {
        logo: '/logo.svg',
        nav: [
          {text: "User Guide", link: "/user_guide/00_what_is_pendora"},
          {text: "Implemenatation Guide", link: "/developer_guide/introduction"}
        ],
        sidebar: {
          '/user_guide/': [
            {
              text: 'Getting Started',
              items: [
                { text: 'What is Pendora', link: '/user_guide/00_what_is_pendora' },
                { text: 'Installation', link: '/user_guide/01_installation' },
              ]
            }
          ],
          '/developer_guide/': [
            {
              text: 'Introduction',
              items: [
                {text: 'Introduction', link: '/developer_guide/introduction'}
              ]
            },
            {
              text: 'Syntax',
              items: [
                {text: 'Objects', link: '/developer_guide/objects'},
                {text: 'The Global Object', link: '/developer_guide/global'},
                {text: 'Methods', link: '/developer_guide/methods'},
              ]
            },
            {
              text: 'Parsing',
              items: [
                {text: 'Tokenisation', link: '/developer_guide/tokenisation'},
                {text: 'Parsing', link: '/developer_guide/parsing'},
                {text: 'Project', link: '/developer_guide/project'},
              ]
            },
            {
            	text: 'Transpiling',
            	items: [
            		{text: 'General Overview', link: '/developer_guide/transpiling_overview'},
            		{text: 'Constants', link: '/developer_guide/transpiler_constants'},
            		{text: 'Conversions', link: '/developer_guide/transpiler_conversions'},
            	]
            },
            {
            	text: 'Language Specifics',
            	items: [],
            },
          ],
        },
        footer: {
          message: 'Released under the <License Unchosen>.',
          copyright: 'Copyright © 2022-present Hayden Brown'
        }
      }
}
