// projects/accessibility-module/content.js
window.A11Y_CONTENT = {
  paneLabels: [
    "ADA: The Legal Baseline",
    "WCAG: The Technical Standard",
    "UDL: Proactive Design",
    "How All 3 Pillars Connect",
    "Spot & Fix Audit 1: Written Content",
    "Spot & Fix Audit 2: Live Slide Audit",
    "In the Moment: Priority Ranking",
    "Quick-Check & Official Resources"
  ],

  connectPillars: {
    ada: {
      title: "1. ADA: The Why (Legal Baseline)",
      body: "The Americans with Disabilities Act establishes that equal access to digital spaces is a civil right, not an optional extra. It sets the legal floor for institutions and employers.",
      connects: "How it connects: ADA explains why we must remove barriers, while WCAG gives us the technical checklist to meet that standard and UDL helps us design beyond bare-minimum compliance."
    },
    wcag: {
      title: "2. WCAG: The How (Technical Standard)",
      body: "The Web Content Accessibility Guidelines translate accessibility into measurable technical rules (color contrast, alt text, keyboard navigation, and semantic headings) organized under POUR.",
      connects: "How it connects: WCAG turns ADA's legal expectation into concrete engineering and content checks, ensuring assistive technologies like screen readers work reliably."
    },
    udl: {
      title: "3. UDL: The Mindset (Proactive Design)",
      body: "Universal Design for Learning shifts teams from reactive fixes to proactive flexibility, building multiple ways to absorb content and participate from day one.",
      connects: "How it connects: UDL raises the ceiling above basic compliance. When combined with WCAG technical hygiene, it creates remote experiences that lift everyone without forcing people to disclose a disability."
    }
  },

  audit2Shared: {
    checkboxes: [
      { id: "color", isReal: true, text: "Status indicators rely only on red and green dots with no icons or text labels." },
      { id: "contrast", isReal: false, text: "Low text-to-background contrast on the slide." },
      { id: "structure", isReal: true, text: "Missing slide heading structure and alt text for assistive technology." },
      { id: "font", isReal: false, text: "Decorative or hard-to-read font style." },
      { id: "spoken", isReal: true, text: "Key metric context is spoken out loud with no captions or written takeaway." }
    ],
    attendees: [
      { id: "colorblind", label: "Color-Blind Attendee" },
      { id: "screenreader", label: "Screen-Reader User" },
      { id: "deaf", label: "Deaf / Hard-of-Hearing Attendee" }
    ],
    barriers: [
      {
        id: "color",
        tabLabel: "Barrier 1",
        statement: "Status indicators rely only on red and green dots with no icons or text labels.",
        correctAttendee: "colorblind",
        wrongNote: "While clear labels help everyone, a Color-Blind Attendee is most directly impacted because red and green dots can look identical without a shape or text cue.",
        rightNote: "Correct. A Color-Blind Attendee cannot reliably distinguish red from green when color is the only signal.",
        wcag: "WCAG 1.4.1 (Use of Color): Color must not be the only visual means of conveying information.",
        udl: "UDL (Multiple Means of Representation): Pairing icons and text labels makes status scannable for everyone.",
        fixLabel: "Add Icons & Text Labels to Status Dots"
      },
      {
        id: "structure",
        tabLabel: "Barrier 2",
        statement: "Missing slide heading structure and alt text for assistive technology.",
        correctAttendee: "screenreader",
        wrongNote: "A Screen-Reader User is most directly impacted here. Without real slide headings and alt text, assistive tech only announces generic placeholders like 'Graphic' or 'Untitled text box.'",
        rightNote: "Correct. A Screen-Reader User relies on proper heading hierarchy and alt text to understand what is on the slide.",
        wcag: "WCAG 1.1.1 (Non-Text Content) & 1.3.1 (Info and Relationships): Provide alt text and semantic structure.",
        udl: "UDL (Clear Structure): Logical headings help all learners navigate and review slides faster.",
        fixLabel: "Apply Slide Heading & Concise Alt Text"
      },
      {
        id: "spoken",
        tabLabel: "Barrier 3",
        statement: "Key metric context is spoken out loud with no captions or written takeaway.",
        correctAttendee: "deaf",
        wrongNote: "A Deaf or Hard-of-Hearing Attendee is most directly impacted. Showing only '78%' on screen while explaining what it means verbally leaves them without the actual takeaway.",
        rightNote: "Correct. A Deaf or Hard-of-Hearing Attendee misses the meaning of '78%' unless spoken context is captioned or written on the slide.",
        wcag: "WCAG 1.2.2 (Captions): Provide captions for live and prerecorded spoken audio.",
        udl: "UDL (Multi-Modal Access): Pairing a concise written takeaway with live captions supports different processing paces and noisy environments.",
        fixLabel: "Add Written Takeaway & Live Captions"
      }
    ]
  },

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
      <p style="margin-bottom:6px;"><strong>Welcome to Week 3!</strong> Here is your quick action plan for the week:</p>
      <ul style="padding-left:18px;">
        <li>Read Chapter 4 and review the grading rubric.</li>
        <li>Post your draft to the discussion board by Friday.</li>
        <li>Join Thursday's optional live Q&A for project support.</li>
      </ul>
    `,
    audit1ImgCaption: "Image: Week_3_Schedule_Graphic.png",
    audit1AltFixed: "Alt text added: 'Timeline graphic showing Chapter 4 reading due Wednesday, Live Q&A on Thursday at 7 PM, and Draft submission due Friday.'",
    audit1LinkBroken: "Click here",
    audit1LinkFixed: "Download the Week 3 Grading Rubric (Accessible Doc)",
    audit2SlideHeader: "Week 3 Course Progress",
    audit2TakeawayFixed: "78% of learners completed the Week 3 SQL lab ahead of Friday's deadline.",
    audit2CaptionText: "[CC]: '78% of the cohort has already finished the Week 3 SQL lab, and we are reviewing Module 3 today.'",
    audit2SrFixed: "Heading 1: Week 3 Course Progress. Metric: 78% lab completion. List: Module 1 On Track, Module 2 On Track, Module 3 Needs Review.",
    audit2Rows: [
      { name: "Module 1: Database Basics", status: "green", fixedLabel: "✓ On Track" },
      { name: "Module 2: SQL Queries", status: "green", fixedLabel: "✓ On Track" },
      { name: "Module 3: Normalization Lab", status: "red", fixedLabel: "! Needs Review" }
    ],
    phases: [
      {
        title: "Phase 1: Pre-Session Barrier",
        prompt: "Ten minutes before your live cohort, a student messages you privately saying their screen reader cannot read the scanned PDF handout you just posted.",
        options: [
          {
            id: "u1-a",
            idealRank: 1,
            text: "Paste the handout's core text into a clean plain-text message for them right now, and confirm you will verbalize key points during the session.",
            feedback: "Best #1 move: solves the immediate barrier privately and respects the student's dignity without disrupting the class."
          },
          {
            id: "u1-b",
            idealRank: 2,
            text: "Offer to send them a clean Word document right after class and share your screen while reading the PDF aloud during the call.",
            feedback: "Second best: well-intentioned, though it leaves the student unable to reference the handout independently during the live activity."
          },
          {
            id: "u1-c",
            idealRank: 3,
            text: "Reply that you will turn on auto-captions and check in with them by name at the start of the call to make sure they can follow along.",
            feedback: "Well-intentioned trap: checking in by name publicly singles out the student and discloses their disability to peers."
          },
          {
            id: "u1-d",
            idealRank: 4,
            text: "Delay the start of the live cohort by 15 minutes so you can try to reformat the PDF from scratch before letting students in.",
            feedback: "Riskiest choice: rushing a PDF reformat under pressure rarely fixes screen-reader tags properly and creates stress for everyone."
          }
        ]
      },
      {
        title: "Phase 2: Mid-Session Curveball",
        prompt: "Halfway through the live cohort, you are walking through a complex flowchart while the chat fills up with fast-moving questions.",
        options: [
          {
            id: "u2-a",
            idealRank: 1,
            text: "Pause briefly, walk through the flowchart verbally step by step, and read the key chat questions aloud before answering them.",
            feedback: "Best #1 move: keeps screen-reader users, audio-only listeners, and anyone overwhelmed by fast chat fully aligned."
          },
          {
            id: "u2-b",
            idealRank: 2,
            text: "Ask a student volunteer in the chat to summarize the questions at the end while you finish explaining the diagram.",
            feedback: "Second best: helpful for pacing, though visually impaired learners still miss out if the diagram itself is not described aloud."
          },
          {
            id: "u2-c",
            idealRank: 3,
            text: "Type quick answers directly in the chat box while continuing to speak about the flowchart so nothing slows down.",
            feedback: "Subtle trap: splits attention across two channels at once and causes screen readers to announce overlapping text."
          },
          {
            id: "u2-d",
            idealRank: 4,
            text: "Use your mouse pointer to circle the key boxes on screen and say 'look right here' so students can focus visually.",
            feedback: "Riskiest choice: relies purely on sight and leaves anyone who cannot see the screen completely lost."
          }
        ]
      },
      {
        title: "Phase 3: Learner Follow-Up",
        prompt: "The live cohort wraps up. You want to support learners who process information at different paces or could not attend live.",
        options: [
          {
            id: "u3-a",
            idealRank: 1,
            text: "Post a concise, structured recap with the recording, a quick-checked transcript, and bulleted key takeaways in an accessible format.",
            feedback: "Best #1 move: applies UDL by giving learners multiple ways to review (video, text, and scannable summary) at their own pace."
          },
          {
            id: "u3-b",
            idealRank: 2,
            text: "Post the recording link right away and invite students to email you individually if they need a written summary.",
            feedback: "Second best: forces students to ask for help reactively instead of providing flexible access proactively."
          },
          {
            id: "u3-c",
            idealRank: 3,
            text: "Upload the raw auto-generated transcript without reviewing it so students have text immediately.",
            feedback: "Subtle trap: auto-transcripts frequently scramble technical terms and equations, creating confusion if not quickly spot-checked."
          },
          {
            id: "u3-d",
            idealRank: 4,
            text: "Share screenshots of the whiteboard notes in the announcement feed so students can glance at them quickly.",
            feedback: "Riskiest choice: screenshots of text are completely invisible to screen readers unless full alt text or typed notes are included."
          }
        ]
      },
      {
        title: "Phase 4: Closing the Loop",
        prompt: "The session is over, and that inaccessible scanned PDF is still sitting in the course shell for future cohorts.",
        options: [
          {
            id: "u4-a",
            idealRank: 1,
            text: "Replace the scanned PDF with an accessible, tagged document (or clean LMS page) and add a 2-minute accessibility check to your prep routine.",
            feedback: "Best #1 move: fixes the root cause permanently so future students never hit the same barrier."
          },
          {
            id: "u4-b",
            idealRank: 2,
            text: "Keep the scanned PDF in place, but attach a plain-text backup file underneath it labeled 'Accessible Version'.",
            feedback: "Second best: helpful short-term, though maintaining two separate files often leads to the accessible version falling out of date."
          },
          {
            id: "u4-c",
            idealRank: 3,
            text: "Make a personal note to email the plain-text version next term if another student mentions using a screen reader.",
            feedback: "Subtle trap: relies on students disclosing a disability to get equal access, which misses the goal of inclusive design."
          },
          {
            id: "u4-d",
            idealRank: 4,
            text: "Remove the handout from the course shell altogether so nobody runs into formatting issues.",
            feedback: "Riskiest choice: strips away a helpful learning resource for everyone instead of fixing the accessibility barrier."
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
      U: "Writing concise team updates and project briefs with clear headings instead of dense walls of text.",
      R: "Sharing editable, structured docs rather than flat scanned PDFs so assistive tech can read them."
    },
    udlExample: "Sharing an async agenda 24 hours before a remote sprint review helps neurodivergent teammates process in advance and lets global teammates across time zones contribute equally.",
    audit1Title: "Broken Remote Team Update Email",
    audit1Sender: "From: Project Lead • Q4 Launch Update",
    audit1BodyBroken: "Hi team, please review the updated Q4 timeline before Friday and add your blockers to the tracker. Make sure you check the budget sheet and review the client feedback notes. Do not forget to join the Thursday sync if you have questions about the rollout.",
    audit1BodyFixed: `
      <p style="margin-bottom:6px;"><strong>Hi team,</strong> here are our Q4 launch action items for this week:</p>
      <ul style="padding-left:18px;">
        <li>Review the Q4 timeline and log blockers by Friday.</li>
        <li>Check the updated budget sheet and client notes.</li>
        <li>Join Thursday's optional sync for rollout Q&A.</li>
      </ul>
    `,
    audit1ImgCaption: "Image: Q4_Milestone_Chart.png",
    audit1AltFixed: "Alt text added: 'Bar chart showing Phase 1 design complete at 100%, Phase 2 QA at 75%, and Launch scheduled for Nov 15.'",
    audit1LinkBroken: "Click here",
    audit1LinkFixed: "Open the Q4 Launch Tracker (Shared Sheet)",
    audit2SlideHeader: "Q4 Launch Readiness",
    audit2TakeawayFixed: "78% of launch tasks are complete; QA sign-off is the final blocker.",
    audit2CaptionText: "[CC]: 'We are at 78% readiness overall, and our main focus today is unblocking QA Sign-Off.'",
    audit2SrFixed: "Heading 1: Q4 Launch Readiness. Metric: 78% tasks complete. List: Design On Track, Engineering On Track, QA Sign-Off Needs Review.",
    audit2Rows: [
      { name: "Design Handoff", status: "green", fixedLabel: "✓ On Track" },
      { name: "Engineering Build", status: "green", fixedLabel: "✓ On Track" },
      { name: "QA Sign-Off", status: "red", fixedLabel: "! Needs Review" }
    ],
    phases: [
      {
        title: "Phase 1: Pre-Meeting Barrier",
        prompt: "Ten minutes before a cross-functional remote sync, a teammate messages you privately saying their screen reader cannot read the scanned PDF brief you just shared.",
        options: [
          {
            id: "c1-a",
            idealRank: 1,
            text: "Paste the brief's key points into a clean plain-text message for them right now, and confirm you will verbalize visuals during the call.",
            feedback: "Best #1 move: solves the immediate barrier privately and lets your teammate participate fully without singling them out."
          },
          {
            id: "c1-b",
            idealRank: 2,
            text: "Offer to send them a clean document right after the meeting and share your screen while reading the PDF aloud.",
            feedback: "Second best: well-intentioned, though it leaves your teammate unable to reference the brief independently during live discussion."
          },
          {
            id: "c1-c",
            idealRank: 3,
            text: "Reply that you will turn on auto-captions and check in with them by name at the start of the call to make sure they can follow along.",
            feedback: "Well-intentioned trap: checking in by name publicly singles them out and discloses their disability to coworkers."
          },
          {
            id: "c1-d",
            idealRank: 4,
            text: "Push the meeting back 15 minutes for everyone so you can try to reformat the PDF from scratch before starting.",
            feedback: "Riskiest choice: rushing a reformat under pressure rarely fixes screen-reader tags properly and creates unnecessary stress."
          }
        ]
      },
      {
        title: "Phase 2: Mid-Meeting Curveball",
        prompt: "Halfway through the sync, you are walking through a complex architecture diagram while the chat fills up with fast-moving questions.",
        options: [
          {
            id: "c2-a",
            idealRank: 1,
            text: "Pause briefly, describe the diagram verbally step by step, and read key chat questions aloud before answering them.",
            feedback: "Best #1 move: keeps screen-reader users, audio-only dial-ins, and anyone overwhelmed by fast chat completely aligned."
          },
          {
            id: "c2-b",
            idealRank: 2,
            text: "Ask a teammate to monitor the chat and summarize questions at the end while you finish walking through the diagram.",
            feedback: "Second best: helps with pacing, though visually impaired teammates still miss out if the diagram is not described aloud."
          },
          {
            id: "c2-c",
            idealRank: 3,
            text: "Type quick answers directly in the chat while continuing to speak about the diagram so the meeting stays on schedule.",
            feedback: "Subtle trap: splits attention across two channels and causes screen readers to announce overlapping text."
          },
          {
            id: "c2-d",
            idealRank: 4,
            text: "Use your cursor to circle the key boxes on screen and say 'as you can see right here' to keep everyone focused.",
            feedback: "Riskiest choice: relies purely on sight and leaves anyone who cannot see the shared screen completely lost."
          }
        ]
      },
      {
        title: "Phase 3: Team Follow-Up",
        prompt: "The sync ends. You want to support teammates who process information at different paces or could not attend live.",
        options: [
          {
            id: "c3-a",
            idealRank: 1,
            text: "Post a concise, structured recap in the team channel with the recording, a spot-checked transcript, and clear action items.",
            feedback: "Best #1 move: applies UDL by giving teammates multiple ways to catch up (video, text, and scannable summary) at their own pace."
          },
          {
            id: "c3-b",
            idealRank: 2,
            text: "Drop the recording link right away and invite teammates to message you if they need a written summary.",
            feedback: "Second best: forces teammates to ask for help reactively instead of providing flexible access proactively."
          },
          {
            id: "c3-c",
            idealRank: 3,
            text: "Upload the raw auto-generated transcript without reviewing it so teammates have text immediately.",
            feedback: "Subtle trap: auto-transcripts frequently scramble acronyms and project names, creating confusion if not quickly spot-checked."
          },
          {
            id: "c3-d",
            idealRank: 4,
            text: "Post screenshots of the digital whiteboard in the team channel so people can glance at them quickly.",
            feedback: "Riskiest choice: screenshots of text are invisible to screen readers unless full alt text or typed notes are included."
          }
        ]
      },
      {
        title: "Phase 4: Closing the Loop",
        prompt: "The meeting is over, and that inaccessible scanned PDF is still sitting in the shared team drive for future sprints.",
        options: [
          {
            id: "c4-a",
            idealRank: 1,
            text: "Replace the scanned PDF with an accessible, structured document and add a quick accessibility check to your team's template workflow.",
            feedback: "Best #1 move: fixes the root cause permanently so future teammates and new hires never hit the same barrier."
          },
          {
            id: "c4-b",
            idealRank: 2,
            text: "Keep the scanned PDF in the drive, but upload a plain-text backup file next to it labeled 'Accessible Version'.",
            feedback: "Second best: helpful short-term, though maintaining two files often leads to the accessible version falling out of sync."
          },
          {
            id: "c4-c",
            idealRank: 3,
            text: "Make a mental note to email the plain-text version next quarter if another teammate mentions using a screen reader.",
            feedback: "Subtle trap: relies on coworkers disclosing a disability to get equal access, which misses the goal of inclusive design."
          },
          {
            id: "c4-d",
            idealRank: 4,
            text: "Delete the brief from the shared drive completely so nobody runs into formatting issues.",
            feedback: "Riskiest choice: removes a helpful team resource instead of fixing the accessibility barrier."
          }
        ]
      }
    ],
    checklist: [
      "Use real headings and scannable bullet lists in emails, docs, and team updates.",
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