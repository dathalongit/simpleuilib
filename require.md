# Vai trò

Bạn là một Senior React Library Engineer có nhiều năm kinh nghiệm xây dựng thư viện React mã nguồn mở.

Nhiệm vụ của bạn là xây dựng một thư viện React theo kiến trúc **Headless UI + Slot Pattern**, mục đích để demo khả năng **custom giao diện (UI)** của thư viện khi được sử dụng trong các dự án khác.

Đây là một thư viện demo kiến trúc, không phải một hệ thống Quiz hoàn chỉnh.

---

# Mục tiêu

Xây dựng một thư viện React tên:

```text
react-headless-quiz
```

Thư viện này sẽ chứa toàn bộ logic xử lý câu hỏi, còn giao diện sẽ do project sử dụng thư viện quyết định.

Một project có thể dùng Tailwind.

Một project khác có thể dùng Bootstrap.

Một project khác có thể dùng Material UI.

Một project khác có thể dùng Ant Design.

Tất cả đều dùng chung một thư viện mà không cần sửa mã nguồn.

---

# Công nghệ

Sử dụng

* React 19
* TypeScript
* Vite Library Mode
* pnpm
* tsup
* ESLint
* Prettier

Không sử dụng bất kỳ framework CSS nào trong thư viện.

Không dùng

* Tailwind
* Bootstrap
* Material UI

Thư viện phải hoàn toàn độc lập với giao diện.

---

# Kiến trúc

Áp dụng các nguyên tắc sau

* Headless UI
* Slot Pattern
* Compound Components
* Context API
* Custom Hooks
* Separation of Concerns
* Single Responsibility Principle

Logic và giao diện phải tách biệt hoàn toàn.

---

# Chức năng

Thư viện chỉ cần hỗ trợ một câu hỏi đơn giản.

Ví dụ

"Câu hỏi"

Ô nhập đáp án

Nút Kiểm tra

Hiển thị

* Đúng
* Sai
* Gợi ý
* Lời giải

Có nút làm lại.

Đủ để demo.

Không cần nhiều loại câu hỏi.

---

# Model dữ liệu

```ts
export interface QuizQuestion {

    id: string;

    question: string;

    answer: string;

    hint?: string;

    solution?: string;

}
```

---

# Cấu trúc thư mục

```text
packages/

    react-headless-quiz/

        src/

            components/

                Quiz.tsx

                Question.tsx

                AnswerInput.tsx

                SubmitButton.tsx

                Feedback.tsx

                Hint.tsx

                Solution.tsx

            context/

                QuizContext.tsx

            hooks/

                useQuiz.ts

            slots/

            types/

            utils/

            index.ts
```

---

# Kiến trúc Component

Thư viện phải hỗ trợ hai cách sử dụng.

## Cách 1

```tsx
<Quiz

    question={question}

/>
```

Sử dụng giao diện mặc định.

---

## Cách 2

Cho phép thay thế từng phần giao diện.

Ví dụ

```tsx
<Quiz

    question={question}

    slots={{

        Container,

        Question,

        Input,

        SubmitButton,

        Feedback,

        Hint,

        Solution

    }}

/>
```

Nếu project truyền slot thì dùng slot đó.

Nếu không truyền thì dùng component mặc định.

Ví dụ

```tsx
const InputComponent =
    slots.Input ?? DefaultInput;
```

---

# Danh sách Slot

Cho phép custom toàn bộ giao diện.

Các slot bao gồm

* Container
* Header
* Question
* Input
* SubmitButton
* Feedback
* Hint
* Solution
* Footer

Mỗi slot nhận props cần thiết từ thư viện.

Ví dụ

```tsx
<QuestionSlot

    question={...}

    disabled={...}

    correct={...}

/>
```

Không được hard-code giao diện.

---

# Hook

Tạo

```text
useQuiz()
```

Hook này chỉ chứa logic.

Không render UI.

Hook trả về

* answer
* setAnswer
* submit()
* retry()
* correct
* wrong
* disabled
* loading
* showHint
* showSolution

---

# Context

Tạo

QuizContext

Các Compound Component sẽ lấy dữ liệu từ Context.

Không truyền props nhiều tầng.

---

# Compound Components

Thư viện phải hỗ trợ

```tsx
<Quiz>

    <Quiz.Question />

    <Quiz.AnswerInput />

    <Quiz.SubmitButton />

    <Quiz.Feedback />

    <Quiz.Hint />

    <Quiz.Solution />

</Quiz>
```

Đồng thời vẫn hỗ trợ Slot Pattern.

---

# Chất lượng mã nguồn

* TypeScript Strict Mode
* Không dùng any
* Không lặp code
* Chia component nhỏ
* Mỗi file dưới khoảng 200 dòng nếu có thể
* Có chú thích đầy đủ
* Dễ mở rộng

---

# Demo

Tạo thư mục

```text
examples/

    tailwind-demo/

    bootstrap-demo/

    mui-demo/
```

Ba project phải dùng chung một thư viện.

Khác nhau hoàn toàn về giao diện.

Logic giống hệt nhau.

---

# README

Sinh README đầy đủ.

Bao gồm

* Giới thiệu
* Kiến trúc
* Cấu trúc thư mục
* Hướng dẫn cài đặt
* Ví dụ sử dụng
* Slot Pattern
* Compound Components
* API
* Ví dụ custom UI
* Hướng dẫn publish npm

---

# Cách thực hiện

Không tạo toàn bộ mã nguồn trong một lần.

Thực hiện tuần tự theo từng bước:

1. Khởi tạo project.
2. Thiết kế kiến trúc.
3. Khai báo kiểu dữ liệu.
4. Xây dựng Context.
5. Xây dựng Hook.
6. Xây dựng các Component.
7. Xây dựng Slot System.
8. Hoàn thiện Compound Components.
9. Tạo các project demo.
10. Hoàn thiện README.

Sau khi hoàn thành mỗi bước, tự động chuyển sang bước tiếp theo.

Chỉ dừng lại nếu gặp vấn đề kỹ thuật thực sự cần người dùng quyết định.

Trong suốt quá trình, luôn ưu tiên khả năng tái sử dụng, mở rộng và minh họa rõ ràng cách tách biệt giữa **Business Logic** và **Presentation (UI)**.
