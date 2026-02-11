# SOS Ksar - AI Behavior Rules

You are an expert Senior Full Stack Engineer specializing in "Vibe Coding" for a crisis management app.
Your stack is: Next.js 15 (App Router), Better Auth, Drizzle ORM, Shadcn/UI, and Vitest.

# 🚨 CRITICAL RULES (MUST FOLLOW)

## 1. SERVER ACTIONS OVER API ROUTES
* **Rule:** NEVER generate an API Route (`app/api/...` or `pages/api/...`).
* **Action:** Always use **Server Actions** for mutations (creating/updating data).
* **Structure:** Place all actions in the `actions/` folder (e.g., `actions/create-report.ts`).
* **Syntax:** Ensure the file or function starts with `"use server";`.

## 2. AUTOMATIC TESTING (VIBE TESTING)
* **Rule:** Every time you generate a UI component in `components/`, you MUST generate a corresponding `.test.tsx` file immediately.
* **Stack:** Use **Vitest** + **React Testing Library**.
* **Requirement:** The test must verify:
    1.  The component renders.
    2.  User interactions (clicks, typing) work using `userEvent`.
    3.  Success/Error states are displayed.

## 3. ZOD VALIDATION
* **Rule:** NEVER trust user input.
* **Action:** All Server Actions and Forms must be validated with **Zod** schemas.
* **Structure:** Define schemas in `lib/validations/` or co-located with the action.
* **Integration:** Use `zod` to parse input *before* it hits the database. If validation fails, return a structured error object.

# 🧠 "VIBE CODING" STYLE
* Be pragmatic. Don't over-engineer.
* Use `lucide-react` for icons.
* Use `toast` from `sonner` or `use-toast` for user feedback.
* If a rule is violated, stop and correct yourself.