// projects/accessibility-module/content.js
window.A11Y_CONTENT = {
  paneLabels: [
    "ADA: The Legal Baseline",
    "WCAG: The Technical Standard",
    "UDL: Proactive Design",
    "How All 3 Pillars Connect",
    "Spot & Fix Audit 1: Written Content",
    "Spot & Fix Audit 2: Live Sessions",
    "In the Moment: Priority Ranking",
    "Quick-Check & Official Resources"
  ],

  university: {
    contextName: "Online University",
    adaExample: "In higher education, ADA requires institutions to ensure online courses, syllabi, LMS pages, and live cohorts are accessible so students with disabilities have equal access to learning.",
    pourExamples: {
      P: "Adding accurate captions to recorded lecture videos and alt text to course diagrams.",
      O: "Ensuring students can navigate LMS modules, quizzes, and tabs using only a keyboard.",
      U: "Using consistent weekly module layouts and clear instructions without unexplained jargon.",
      R: "Structuring syllabi with real headings (H1, H2, H3) instead of just bolding text so screen readers can jump between sections."
    },
    udlExample: "Posting a structured written summary alongside a live cohort recording helps deaf or hard-of-hearing students, busy parents studying late at night, and non-native English speakers all at once.",
    audit1Title: "Broken LMS Weekly Announcement",
    audit1Sender: "From: Course Instructor • Week 3 Announcements",
    audit1BodyBroken: "Welcome to Week 3! Please review the rubric before Friday and submit your draft on time. Make sure you read chapter 4 and check the discussion board for peer feedback. Do not forget to attend the live Q&A session on Thursday evening if you have questions about the project.",
    audit1BodyFixed: `
      <strong>Week 3 Action Plan</strong>
      <ul style="padding-left:18px; margin-top:6px;">
        <li>Read Chapter 4 and review the grading rubric.</li>
        <li>Post your draft to the discussion board by Friday.</li>
        <li>Join Thursday's optional live Q&A for project support.</li>
      </ul>
    `,
    audit1ImgCaption: "Image: Week_3_Schedule_Graphic.png",
    audit1AltFixed: "Alt text added: 'Timeline graphic showing Chapter 4 reading due Wednesday, Live Q&A on Thursday at 7 PM, and Draft submission due Friday.'",
    audit1LinkBroken: "Click here",
    audit1LinkFixed: "Download the Week 3 Grading Rubric (Accessible Doc)",
    audit2Title: "Live Online Cohort Setup (MS Teams / Zoom)",
    audit2Items: [
      { id: "captions", title: "Enable Live Captions & Transcript", note: "Supports deaf/hard-of-hearing students, non-native speakers, and learners in noisy homes." },
      { id: "verbalize", title: "Verbalize Slides & Chat Questions", note: "Reading visuals and chat aloud keeps screen-reader users and audio-only attendees included." },
      { id: "agenda", title: "Share Agenda & Slides 24 Hours Early", note: "Reduces cognitive load and lets students using assistive tech preview materials at their own pace." },
      { id: "camera", title: "Camera-Optional & Multi-Modal Input", note: "Allowing chat, reactions, or mic participation supports neurodivergent and low-bandwidth learners." }
    ],
    phases: [
      {
        title: "Phase 1: Pre-Session Barrier",
        prompt: "Ten minutes before your live cohort, a student messages you privately saying their screen reader cannot read the scanned PDF handout you just posted. Rank your actions from #1 (Most Likely) to #4 (Least Likely).",
        options: [
          {
            id: "u1-a",
            idealRank: 1,
            text: "Paste the handout's core text into a clean plain-text message for them right now, and confirm you will verbalize key points during the session.",
            feedback: "Solves the immediate barrier privately and respects the student's dignity without disrupting the whole class."
          },
          {
            id: "u1-b",
            idealRank: 2,
            text: "Offer to send them a clean Word document right after class and share your screen while reading the PDF aloud during the call.",
            feedback: "Well-intentioned, though it leaves the student unable to reference the handout independently during the live activity."
          },
          {
            id: "u1-c",
            idealRank: 3,
            text: "Reply that you will turn on auto-captions and check in with them by name at the start of the call to make sure they can follow along.",
            feedback: "A classic well-intentioned trap: checking in by name publicly singles out the student and discloses their disability to peers."
          },
          {
            id: "u1-d",
            idealRank: 4,
            text: "Delay the start of the live cohort by 15 minutes so you can try to reformat the PDF from scratch before letting students in.",
            feedback: "Rushing a reformat under pressure rarely fixes screen-reader tags properly and creates stress for everyone."
          }
        ]
      },
      {
        title: "Phase 2: Mid-Session Curveball",
        prompt: "Halfway through the live cohort, you are walking through a complex flowchart while the chat fills up with fast-moving questions. Rank your actions from #1 (Most Likely) to #4 (Least Likely).",
        options: [
          {
            id: "u2-a",
            idealRank: 1,
            text: "Pause briefly, walk through the flowchart verbally step by step, and read the key chat questions aloud before answering them.",
            feedback: "Keeps screen-reader users, audio-only listeners, and anyone overwhelmed by fast chat fully aligned."
          },
          {
            id: "u2-b",
            idealRank: 2,
            text: "Ask a student volunteer in the chat to summarize the questions at the end while you finish explaining the diagram.",
            feedback: "Helpful for pacing, though it still leaves visually impaired learners behind if the diagram itself is not described aloud."
          },
          {
            id: "u2-c",
            idealRank: 3,
            text: "Type quick answers directly in the chat box while continuing to speak about the flowchart so nothing slows down.",
            feedback: "Splits attention across two channels at once, which increases cognitive load and makes screen readers announce overlapping text."
          },
          {
            id: "u2-d",
            idealRank: 4,
            text: "Use your mouse pointer to circle the key boxes on screen and say 'look right here' so students can focus visually.",
            feedback: "Relies purely on sight and leaves anyone who cannot see the screen completely lost."
          }
        ]
      },
      {
        title: "Phase 3: Learner Follow-Up",
        prompt: "The live cohort wraps up. You want to support learners who process information at different paces or could not attend live. Rank your actions from #1 (Most Likely) to #4 (Least Likely).",
        options: [
          {
            id: "u3-a",
            idealRank: 1,
            text: "Post a concise, structured recap with the recording, a quick-checked transcript, and bulleted key takeaways in an accessible format.",
            feedback: "Applies UDL by giving learners multiple ways to review (video, text, and scannable summary) at their own pace."
          },
          {
            id: "u3-b",
            idealRank: 2,
            text: "Post the recording link right away and invite students to email you individually if they need a written summary.",
            feedback: "Forces students to ask for help reactively instead of providing flexible access proactively."
          },
          {
            id: "u3-c",
            idealRank: 3,
            text: "Upload the raw auto-generated transcript without reviewing it so students have text immediately.",
            feedback: "Auto-transcripts frequently scramble technical terms and equations, creating confusion if not quickly spot-checked."
          },
          {
            id: "u3-d",
            idealRank: 4,
            text: "Share screenshots of the whiteboard notes in the announcement feed so students can glance at them quickly.",
            feedback: "Screenshots of text are invisible to screen readers unless full alt text or typed notes are included."
          }
        ]
      },
      {
        title: "Phase 4: Closing the Loop",
        prompt: "The session is over, and that inaccessible scanned PDF is still sitting in the course shell for future cohorts. Rank your actions from #1 (Most Likely) to #4 (Least Likely).",
        options: [
          {
            id: "u4-a",
            idealRank: 1,
            text: "Replace the scanned PDF with an accessible, tagged document (or clean LMS page) and add a 2-minute accessibility check to your prep routine.",
            feedback: "Fixes the root cause permanently so future students never hit the same barrier."
          },
          {
            id: "u4-b",
            idealRank: 2,
            text: "Keep the scanned PDF in place, but attach a plain-text backup file underneath it labeled 'Accessible Version'.",
            feedback: "Better than nothing, though maintaining two separate files often leads to the accessible version falling out of date."
          },
          {
            id: "u4-c",
            idealRank: 3,
            text: "Make a personal note to email the plain-text version next term if another student mentions using a screen reader.",
            feedback: "Relies on students disclosing a disability to get equal access, which misses the goal of inclusive design."
          },
          {
            id: "u4-d",
            idealRank: 4,
            text: "Remove the handout from the course shell altogether so nobody runs into formatting issues.",
            feedback: "Removes a helpful learning resource for everyone instead of fixing the accessibility barrier."
          }
        ]
      }
    ],
    checklist: [
      "Use real headings (H1, H2, H3) and bullet lists in LMS announcements and syllabi.",
      "Verify text color contrast meets at least 4.5:1 against its background.",
      "Replace vague links ('Click here') with descriptive link text.",
      "Add concise alt text to all instructional charts, diagrams, and flyers.",
      "Turn on live captions, verbalize visuals/chat, and share slides 24 hours early.",
      "Follow up with a structured written summary alongside the session recording."
    ]
  },

  corporate: {
    contextName: "Corporate Remote",
    adaExample: "In a remote workplace, ADA requires employers to provide equal access to internal training, HR portals, collaboration tools, and reasonable workplace accommodations.",
    pourExamples: {
      P: "Using high-contrast colors on slide decks and enabling live captions during company all-hands calls.",
      O: "Ensuring internal dashboards, forms, and onboarding portals work smoothly with keyboard-only navigation.",
      U: "Writing concise Slack updates and project briefs with clear headings instead of dense walls of text.",
      R: "Sharing editable, structured docs (Google Docs, Notion, Word) rather than flat scanned PDFs so assistive tech can read them."
    },
    udlExample: "Sharing an async agenda 24 hours before a remote sprint review helps neurodivergent teammates process in advance and lets global teammates across time zones contribute equally.",
    audit1Title: "Broken Remote Team Update Email",
    audit1Sender: "From: Project Lead • Q4 Launch Update",
    audit1BodyBroken: "Hi team, please review the updated Q4 timeline before Friday and add your blockers to the tracker. Make sure you check the budget sheet and review the client feedback notes. Do not forget to join the Thursday sync if you have questions about the rollout.",
    audit1BodyFixed: `
      <strong>Q4 Launch Action Items</strong>
      <ul style="padding-left:18px; margin-top:6px;">
        <li>Review the Q4 timeline and log blockers by Friday.</li>
        <li>Check the updated budget sheet and client notes.</li>
        <li>Join Thursday's optional sync for rollout Q&A.</li>
      </ul>
    `,
    audit1ImgCaption: "Image: Q4_Milestone_Chart.png",
    audit1AltFixed: "Alt text added: 'Bar chart showing Phase 1 design complete at 100%, Phase 2 QA at 75%, and Launch scheduled for Nov 15.'",
    audit1LinkBroken: "Click here",
    audit1LinkFixed: "Open the Q4 Launch Tracker (Google Sheet)",
    audit2Title: "Remote Team Sync Setup (Zoom / MS Teams)",
    audit2Items: [
      { id: "captions", title: "Enable Live Captions & Transcript", note: "Supports deaf/hard-of-hearing teammates, global colleagues, and anyone working in a noisy space." },
      { id: "verbalize", title: "Verbalize Slides & Chat Questions", note: "Reading visuals and chat aloud keeps screen-reader users and dial-in teammates fully included." },
      { id: "agenda", title: "Share Agenda & Pre-Read 24 Hours Early", note: "Reduces cognitive load and gives everyone time to prepare thoughtful input." },
      { id: "camera", title: "Camera-Optional & Multi-Modal Input", note: "Allowing chat, reactions, or mic participation supports neurodivergent and low-bandwidth teammates." }
    ],
    phases: [
      {
        title: "Phase 1: Pre-Meeting Barrier",
        prompt: "Ten minutes before a cross-functional remote sync, a teammate messages you privately saying their screen reader cannot read the scanned PDF brief you just shared. Rank your actions from #1 (Most Likely) to #4 (Least Likely).",
        options: [
          {
            id: "c1-a",
            idealRank: 1,
            text: "Paste the brief's key points into a clean plain-text message for them right now, and confirm you will verbalize visuals during the call.",
            feedback: "Solves the immediate barrier privately and lets your teammate participate fully without singling them out."
          },
          {
            id: "c1-b",
            idealRank: 2,
            text: "Offer to send them a clean Google Doc right after the meeting and share your screen while reading the PDF aloud.",
            feedback: "Well-intentioned, though it leaves your teammate unable to reference the brief independently during live discussion."
          },
          {
            id: "c1-c",
            idealRank: 3,
            text: "Reply that you will turn on auto-captions and check in with them by name at the start of the call to make sure they can follow along.",
            feedback: "A classic well-intentioned trap: checking in by name publicly singles them out and discloses their disability to coworkers."
          },
          {
            id: "c1-d",
            idealRank: 4,
            text: "Push the meeting back 15 minutes for everyone so you can try to reformat the PDF from scratch before starting.",
            feedback: "Rushing a reformat under pressure rarely fixes screen-reader tags properly and creates unnecessary stress."
          }
        ]
      },
      {
        title: "Phase 2: Mid-Meeting Curveball",
        prompt: "Halfway through the sync, you are walking through a complex architecture diagram while the chat fills up with fast-moving questions. Rank your actions from #1 (Most Likely) to #4 (Least Likely).",
        options: [
          {
            id: "c2-a",
            idealRank: 1,
            text: "Pause briefly, describe the diagram verbally step by step, and read key chat questions aloud before answering them.",
            feedback: "Keeps screen-reader users, audio-only dial-ins, and anyone overwhelmed by fast chat completely aligned."
          },
          {
            id: "c2-b",
            idealRank: 2,
            text: "Ask a teammate to monitor the chat and summarize questions at the end while you finish walking through the diagram.",
            feedback: "Helps with pacing, though it still leaves visually impaired teammates behind if the diagram is not described aloud."
          },
          {
            id: "c2-c",
            idealRank: 3,
            text: "Type quick answers directly in the chat while continuing to speak about the diagram so the meeting stays on schedule.",
            feedback: "Splits attention across two channels and causes screen readers to announce overlapping text."
          },
          {
            id: "c2-d",
            idealRank: 4,
            text: "Use your cursor to circle the key boxes on screen and say 'as you can see right here' to keep everyone focused.",
            feedback: "Relies purely on sight and leaves anyone who cannot see the shared screen completely lost."
          }
        ]
      },
      {
        title: "Phase 3: Team Follow-Up",
        prompt: "The sync ends. You want to support teammates who process information at different paces or could not attend live. Rank your actions from #1 (Most Likely) to #4 (Least Likely).",
        options: [
          {
            id: "c3-a",
            idealRank: 1,
            text: "Post a concise, structured recap in Slack/Teams with the recording, a spot-checked transcript, and clear action items.",
            feedback: "Applies UDL by giving teammates multiple ways to catch up (video, text, and scannable summary) at their own pace."
          },
          {
            id: "c3-b",
            idealRank: 2,
            text: "Drop the recording link right away and invite teammates to DM you if they need a written summary.",
            feedback: "Forces teammates to ask for help reactively instead of providing flexible access proactively."
          },
          {
            id: "c3-c",
            idealRank: 3,
            text: "Upload the raw auto-generated transcript without reviewing it so teammates have text immediately.",
            feedback: "Auto-transcripts frequently scramble acronyms and project names, creating confusion if not quickly spot-checked."
          },
          {
            id: "c3-d",
            idealRank: 4,
            text: "Post screenshots of the digital whiteboard in the team channel so people can glance at them quickly.",
            feedback: "Screenshots of text are invisible to screen readers unless full alt text or typed notes are included."
          }
        ]
      },
      {
        title: "Phase 4: Closing the Loop",
        prompt: "The meeting is over, and that inaccessible scanned PDF is still sitting in the shared team drive for future sprints. Rank your actions from #1 (Most Likely) to #4 (Least Likely).",
        options: [
          {
            id: "c4-a",
            idealRank: 1,
            text: "Replace the scanned PDF with an accessible, structured document and add a quick accessibility check to your team's template workflow.",
            feedback: "Fixes the root cause permanently so future teammates and new hires never hit the same barrier."
          },
          {
            id: "c4-b",
            idealRank: 2,
            text: "Keep the scanned PDF in the drive, but upload a plain-text backup file next to it labeled 'Accessible Version'.",
            feedback: "Better than nothing, though maintaining two files often leads to the accessible version falling out of sync."
          },
          {
            id: "c4-c",
            idealRank: 3,
            text: "Make a mental note to email the plain-text version next quarter if another teammate mentions using a screen reader.",
            feedback: "Relies on coworkers disclosing a disability to get equal access, which misses the goal of inclusive design."
          },
          {
            id: "c4-d",
            idealRank: 4,
            text: "Delete the brief from the shared drive completely so nobody runs into formatting issues.",
            feedback: "Removes a helpful team resource instead of fixing the accessibility barrier."
          }
        ]
      }
    ],
    checklist: [
      "Use real headings and scannable bullet lists in emails, docs, and Slack updates.",
      "Verify slide and document color contrast meets at least 4.5:1.",
      "Replace vague links ('Click here') with descriptive link text.",
      "Add concise alt text to all charts, screenshots, and deck visuals.",
      "Enable live captions, verbalize visuals/chat, and share agendas 24 hours early.",
      "Send a structured async recap alongside the meeting recording."
    ]
  },

  resources: [
    {
      title: "ADA.gov (Official Guide) ↗",
      desc: "Americans with Disabilities Act legal guidance and digital accessibility rules.",
      url: "https://www.ada.gov/resources/web-guidance/"
    },
    {
      title: "W3C WCAG 2.2 Overview ↗",
      desc: "The global technical standard and POUR principles for accessible web content.",
      url: "https://www.w3.org/WAI/standards-guidelines/wcag/"
    },
    {
      title: "CAST UDL Guidelines ↗",
      desc: "Universal Design for Learning framework for proactive, flexible design.",
      url: "https://udlguidelines.cast.org/"
    }
  ]
};
// END OF FILE