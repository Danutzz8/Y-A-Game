# AGENTS.md - Development Guide for Math Whiz Game

## Project Overview

- **Project name**: Math Whiz
- **Type**: Simple vanilla JavaScript web game
- **Core functionality**: An educational math quiz game for kids with progressive difficulty across 5 stages (addition, subtraction, multiplication, division, and mixed operations)
- **Tech stack**: Plain HTML5, CSS3, JavaScript (ES6+)
- **Target users**: Children learning basic math

## Project Structure

```
Games-AI/
├── index.html    # Main HTML file
├── script.js    # Game logic (vanilla JavaScript)
├── style.css    # Styling
└── AGENTS.md    # This file
```

## Commands

### Running the Project

Open `index.html` directly in any modern web browser. No build step required.

### Development

- Use a local server for development (recommended for hot reload):
  ```bash
  npx serve
  # or
  python -m http.server 8000
  ```

### Testing

- No automated tests exist currently
- Manual testing: Open `index.html` in browser and verify:
  - Math problems generate correctly at each stage
  - Score increments on correct answers
  - Score decrements on wrong answers
  - Stage progression works at score thresholds (10, 20, 30, 40)
  - Input validation handles non-numeric input
  - Enter key submits answer

### Running a Single Test

- No test framework configured - manual testing only
- To test a specific feature:
  1. Open browser DevTools (F12)
  2. Use Console to test functions directly
  3. Example: `document.getElementById('answer').value = '5'; document.getElementById('submit').click();`

### Linting

- No linting configuration currently set up
- Optional: Add ESLint with Airbnb or standard config if project grows
- If adding ESLint, recommended setup:
  ```bash
  npm init -y
  npm install eslint --save-dev
  npx eslint --init
  ```

### Building

- No build step required - this is a vanilla JS project
- Deploy by copying the three files to any web server

### Code Quality Commands (Future)

When the project grows, consider adding:
- `npm run lint` - Run ESLint
- `npm test` - Run Jest tests
- `npm run build` - Build for production

## Code Style Guidelines

### General Principles

- Keep code simple and readable
- Avoid over-engineering for a small project
- Use semantic variable and function names
- Follow existing code patterns in the codebase

### JavaScript Style

- Use `const` by default, `let` when mutation is needed, avoid `var`
- Use arrow functions for callbacks and anonymous functions
- Prefer template literals over string concatenation
- Use ES6+ features (destructuring, spread operator, etc.)
- Always use strict equality (`===` and `!==`) instead of loose equality
- Use meaningful variable names that describe their purpose

### Naming Conventions

- **Variables/functions**: camelCase (e.g., `currentProblem`, `generateProblem`)
- **Constants**: SCREAMING_SNAKE_CASE for truly constant values
- **DOM elements**: Descriptive names with Element suffix (e.g., `submitButton`, `feedbackElement`)
- **IDs in HTML**: kebab-case (matching the existing pattern)
- **Classes**: BEM-like naming (e.g., `.container`, `.info`)

### Formatting

- Use 4 spaces for indentation (matching existing code)
- Maximum line length: 100 characters
- Add spaces around operators and after commas
- Use semicolons to end statements
- Break long lines at logical points (e.g., after function parameters)
- Align similar elements vertically when it improves readability

### Type Handling

- Use `parseInt(value, 10)` when converting to integers (always specify radix)
- Use `Number.isNaN()` over global `isNaN()`
- Validate user input before processing
- Check for null/undefined values when accessing object properties
- Use `typeof` sparingly - prefer explicit checks

### Error Handling

- Check for null/undefined before accessing object properties
- Provide user feedback for invalid input (existing pattern: show message in feedback element)
- Use meaningful error messages
- Handle edge cases in math operations (division by zero, overflow, etc.)
- Never expose internal errors to users - always show friendly messages

### DOM Manipulation

- Cache DOM element references (existing pattern at top of file)
- Use `textContent` instead of `innerText` for text updates
- Use `addEventListener` for event handling, not inline handlers
- Minimize DOM updates - batch changes when possible
- Use event delegation for repeated similar elements
- Clean up event listeners if elements are dynamically removed

### HTML/CSS Conventions

- Use semantic HTML elements (header, main, section, etc.)
- Keep CSS in external `style.css` file
- Use BEM-like class naming if adding new styles
- Ensure responsive design works on different screen sizes
- Use CSS custom properties for theming if needed
- Keep specificity low - avoid deeply nested selectors

### Comments

- Add comments for complex logic or non-obvious decisions
- Example: Comment explaining why `num2 <= num1` for subtraction (ensures positive result)
- Avoid obvious comments (e.g., `// Increment score`)
- Use JSDoc-style comments for functions that may be called externally
- Comment any magic numbers with their meaning

### Performance Considerations

- Avoid unnecessary re-renders by caching computed values
- Use efficient DOM queries - cache element references
- Be mindful of event handler overhead
- Keep the codebase small since this is a simple project

### Security

- Never insert user input directly into innerHTML
- Sanitize any user input before displaying it
- Avoid eval() or similar dynamic code execution
- Follow basic XSS prevention practices

## Adding New Features

When extending this project:

1. **HTML**: Add new elements inside the `#game` container
2. **CSS**: Add styles following existing patterns in `style.css`
3. **JS**: 
   - Add new state variables at the top
   - Create functions for distinct functionality
   - Wire up event listeners at the bottom of the script
4. **Testing**: Test any new functionality manually in browser

## Future Improvements (If Project Grows)

- Add ESLint with a JavaScript-friendly config
- Add unit tests with Jest
- Consider TypeScript for type safety
- Add a build system (Vite or Parcel) if bundling becomes needed
