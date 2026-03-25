# OpenClaw Mission Control

A custom dashboard for OpenClaw built through natural language prompts.

## Overview
This mission control system allows you to build any tool your OpenClaw needs on the fly through simple prompts - no programming experience required.

## Structure
- `/pages` - Next.js pages
- `/components` - Reusable UI components
- `/styles` - CSS styles
- `/public` - Static assets

## Getting Started
1. Install dependencies: `npm install`
2. Run development server: `npm run dev`
3. Open [http://localhost:3000](http://localhost:3000) in your browser

## Mission Control Components
As described in the video, this system includes:
- Task Board (track agent activities)
- Calendar Screen (view cron jobs)
- Project Screen (track major projects)
- Memory Screen (organized conversations)
- Doc Screen (document management)
- Team Screen (agent/sub-agent overview)
- Office Screen (2D visualization)

Each component can be built by prompting your OpenClaw with natural language requests.

## Integration with OpenClaw
This mission control is designed to work with your OpenClaw instance:
- Task Board integrates with heartbeat checks for autonomous task execution
- Calendar Screen shows scheduled tasks from your OpenClaw
- Memory Screen connects to your OpenClaw's memory system
- And more...

## Customization
All tools are built through prompts to your OpenClaw, making them hyperpersonalized to your workflow.

"Hey, build me out a tool in my mission control that does [specific function]"
