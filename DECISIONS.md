## 🧠 General Approach

The solution was designed with a focus on **clarity, separation of concerns, and scalability**, while keeping the implementation simple and aligned with the scope of the challenge.

Instead of overengineering, I prioritized:

* clean architecture
* readable and maintainable code
* a clear data flow between backend and frontend

---

## ⚙️ Technical Decisions

### Backend (NestJS)

* Used a **modular architecture (feature-based)** with internal layers:

  * controller
  * service
  * repository
  * mapper

* Implemented a **Repository pattern** to abstract the data source (JSON file), allowing future replacement with a real API or database without affecting business logic.

* Introduced a **Mapper layer** to transform raw external data into a clean domain model, avoiding leakage of provider structure.

* Encapsulated business logic (hype calculation, rules) inside the service layer using small, testable functions.

* Implemented:

  * filtering (author, minHype)
  * sorting (hype, date)
  * pagination (page, limit)

* Pagination is applied **after filtering and sorting**, following best practices for consistent results.

---

### Frontend (React + Vite + TypeScript)

* Chose **Vite + React + TypeScript** for simplicity, fast setup, and because SSR was not required.

* Used a **feature-based architecture (screaming architecture)**:

  * all logic related to videos is grouped under `features/videos`

* Implemented a custom hook:

  * `useVideos` handles data fetching, pagination, and state

* UI is composed of small, reusable components:

  * FeaturedVideo (hero)
  * VideoGrid
  * VideoCard
  * FiltersBar

* Implemented:

  * filtering controls connected to backend query params
  * infinite scroll using IntersectionObserver
  * skeleton loading states
  * error handling

---

### UI / UX

* Designed a **dark-themed interface** with clear visual hierarchy.

* The "Crown Jewel" (highest hype video) is presented as a hero section with:

  * larger layout
  * visual emphasis
  * subtle glow and overlay

* Animations were intentionally kept **minimal and purposeful**:

  * skeleton loaders for perceived performance
  * subtle fade-in transitions
  * light hover interactions

---

## ⚖️ Assumptions & Simplifications

* The data source is a static JSON file simulating an external API.
* No authentication or authorization is required.
* Dataset is relatively small, so optimizations like caching are not necessary.
* Infinite scroll is implemented as a UX improvement, not for performance constraints.

---

## 🧩 Problems & Solutions

### 1. Input losing focus while typing filters

**Problem:**
Typing in filter inputs triggered immediate requests, causing re-renders and loss of focus.

**Solution:**
Separated state into:

* `filters` (input state)
* `appliedFilters` (debounced state used for API calls)

Added a debounce mechanism to improve UX and reduce unnecessary requests.

---

### 2. Infinite scroll + filters interaction

**Problem:**
When filters changed, previous paginated data persisted incorrectly.

**Solution:**
Reset:

* page
* data array
* hasMore flag

This ensures consistent results when filters are updated.

---

### 3. Visual hierarchy of the featured video

**Problem:**
The featured video did not stand out enough visually.

**Solution:**
Improved:

* gradient overlays
* glow/shadow
* typography scale
* spacing

Focused on contrast rather than adding excessive visual effects.

---

## 🤖 Use of AI Tools

AI tools were used as a support mechanism.

They were mainly used for:

* generating initial boilerplate structures
* exploring alternative implementations
* refining UI details and small improvements

All architectural decisions, trade-offs, and final implementations were **reviewed and adjusted manually** to ensure consistency and correctness.

---

## 🧾 Relevant Prompts Used

Some of the most relevant prompts included:

* "Create a basic NestJS module for a videos feature using a modular structure. Include controller, service, and additional layers such as repository and mapper to organize the code and separate responsibilities. The data source can be a JSON file simulating an external API."

* "Generate unit tests in NestJS for a service that processes video data. The tests should cover hype calculation logic, including rules such as doubling the score when the title contains 'tutorial' and returning zero when comments are disabled. Also include tests for filtering, sorting, and edge cases. Use Jest and structure tests clearly following Arrange-Act-Assert principles."

Prompts were iteratively refined, and outputs were not used blindly — they were adapted to fit the overall design.

---

## 🚀 Final Notes

The goal of this solution was to balance:

* simplicity
* scalability
* user experience

While keeping the implementation aligned with real-world practices and avoiding unnecessary complexity.
