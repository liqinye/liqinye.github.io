// get the ninja-keys element
const ninja = document.querySelector('ninja-keys');

// add the home and posts menu items
ninja.data = [{
    id: "nav-about",
    title: "About",
    section: "Navigation",
    handler: () => {
      window.location.href = "/";
    },
  },{id: "nav-publications",
          title: "Publications",
          description: "",
          section: "Navigation",
          handler: () => {
            window.location.href = "/publications/";
          },
        },{id: "nav-cv",
          title: "CV",
          description: "",
          section: "Navigation",
          handler: () => {
            window.location.href = "/https:/liqinye.github.io/assets/pdf/liqin_resume.pdf";
          },
        },{id: "nav-misc",
          title: "Misc",
          description: "",
          section: "Navigation",
          handler: () => {
            window.location.href = "/misc/";
          },
        },{id: "post-google-gemini-updates-flash-1-5-gemma-2-and-project-astra",
        
          title: 'Google Gemini updates: Flash 1.5, Gemma 2 and Project Astra <svg width="1.2rem" height="1.2rem" top=".5rem" viewBox="0 0 40 40" xmlns="http://www.w3.org/2000/svg"><path d="M17 13.5v6H5v-12h6m3-3h6v6m0-6-9 9" class="icon_svg-stroke" stroke="#999" stroke-width="1.5" fill="none" fill-rule="evenodd" stroke-linecap="round" stroke-linejoin="round"></path></svg>',
        
        description: "We’re sharing updates across our Gemini family of models and a glimpse of Project Astra, our vision for the future of AI assistants.",
        section: "Posts",
        handler: () => {
          
            window.open("https://blog.google/technology/ai/google-gemini-update-flash-ai-assistant-io-2024/", "_blank");
          
        },
      },{id: "post-displaying-external-posts-on-your-al-folio-blog",
        
          title: 'Displaying External Posts on Your al-folio Blog <svg width="1.2rem" height="1.2rem" top=".5rem" viewBox="0 0 40 40" xmlns="http://www.w3.org/2000/svg"><path d="M17 13.5v6H5v-12h6m3-3h6v6m0-6-9 9" class="icon_svg-stroke" stroke="#999" stroke-width="1.5" fill="none" fill-rule="evenodd" stroke-linecap="round" stroke-linejoin="round"></path></svg>',
        
        description: "",
        section: "Posts",
        handler: () => {
          
            window.open("https://medium.com/@al-folio/displaying-external-posts-on-your-al-folio-blog-b60a1d241a0a?source=rss-17feae71c3c4------2", "_blank");
          
        },
      },{id: "books-the-godfather",
          title: 'The Godfather',
          description: "",
          section: "Books",handler: () => {
              window.location.href = "/books/the_godfather/";
            },},{id: "news-sidyp-is-accepted-to-kdd-2025-research-track-we-use-simplex-diffusion-with-dynamic-priors-to-denoise-llm-generated-labels-lifting-bert-classifier-by-7-on-auto-labeled-nlp-tasks",
          title: 'SiDyP is accepted to KDD 2025 Research Track! We use simplex diffusion with...',
          description: "",
          section: "News",},{id: "news-our-colm-2025-paper-is-out-we-expose-llm-s-financial-knowledge-amnesia-forgetting-historical-financials-while-hallucinating-most-on-companies-they-sound-surest-about",
          title: 'Our COLM 2025 paper is out! We expose LLM’s financial knowledge amnesia: forgetting...',
          description: "",
          section: "News",},{id: "news-wcb-lands-at-neurips-2025-d-amp-amp-b-track-we-release-the-largest-monetary-policy-corpus-to-date-to-benchmark-how-llms-read-what-the-world-s-central-banks-are-really-saying",
          title: 'WCB lands at NeurIPS 2025 D&amp;amp;amp;B Track! We release the largest monetary policy...',
          description: "",
          section: "News",},{id: "news-i-will-be-joining-the-amazon-rufus-post-training-team-as-an-applied-scientist-intern-this-summer-see-you-in-palo-alto",
          title: '🎉 I will be joining the Amazon Rufus Post-training team as an Applied...',
          description: "",
          section: "News",},{id: "news-ipo-mine-is-accepted-to-kdd-2026-d-amp-amp-b-track-we-release-a-toolkit-and-large-scale-multimodal-dataset-for-section-structured-analysis-of-long-multimodal-ipo-filings",
          title: 'IPO-Mine is accepted to KDD 2026 D&amp;amp;amp;B Track! We release a toolkit and...',
          description: "",
          section: "News",},{id: "news-honored-to-be-selected-as-a-recipient-of-the-workday-ai-phd-fellowship-many-thanks-to-the-workday-ai-research-team-for-supporting-my-work",
          title: '🥳 Honored to be selected as a recipient of the Workday AI PhD...',
          description: "",
          section: "News",},{id: "projects-project-1",
          title: 'project 1',
          description: "with background image",
          section: "Projects",handler: () => {
              window.location.href = "/projects/1_project/";
            },},{id: "projects-project-2",
          title: 'project 2',
          description: "a project with a background image and giscus comments",
          section: "Projects",handler: () => {
              window.location.href = "/projects/2_project/";
            },},{id: "projects-project-3-with-very-long-name",
          title: 'project 3 with very long name',
          description: "a project that redirects to another website",
          section: "Projects",handler: () => {
              window.location.href = "/projects/3_project/";
            },},{id: "projects-project-4",
          title: 'project 4',
          description: "another without an image",
          section: "Projects",handler: () => {
              window.location.href = "/projects/4_project/";
            },},{id: "projects-project-5",
          title: 'project 5',
          description: "a project with a background image",
          section: "Projects",handler: () => {
              window.location.href = "/projects/5_project/";
            },},{id: "projects-project-6",
          title: 'project 6',
          description: "a project with no image",
          section: "Projects",handler: () => {
              window.location.href = "/projects/6_project/";
            },},{id: "projects-project-7",
          title: 'project 7',
          description: "with background image",
          section: "Projects",handler: () => {
              window.location.href = "/projects/7_project/";
            },},{id: "projects-project-8",
          title: 'project 8',
          description: "an other project with a background image and giscus comments",
          section: "Projects",handler: () => {
              window.location.href = "/projects/8_project/";
            },},{id: "projects-project-9",
          title: 'project 9',
          description: "another project with an image 🎉",
          section: "Projects",handler: () => {
              window.location.href = "/projects/9_project/";
            },},{
        id: 'social-linkedin',
        title: 'LinkedIn',
        section: 'Socials',
        handler: () => {
          window.open("https://www.linkedin.com/in/liqin-ye-b48981212", "_blank");
        },
      },{
        id: 'social-scholar',
        title: 'Google Scholar',
        section: 'Socials',
        handler: () => {
          window.open("https://scholar.google.com/citations?user=YxM-Z3AAAAAJ", "_blank");
        },
      },{
        id: 'social-github',
        title: 'GitHub',
        section: 'Socials',
        handler: () => {
          window.open("https://github.com/liqinye", "_blank");
        },
      },{
        id: 'social-x',
        title: 'X',
        section: 'Socials',
        handler: () => {
          window.open("https://twitter.com/liqinye27", "_blank");
        },
      },];
