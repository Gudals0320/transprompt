# transprompt

음성인식(STT)으로 받아쓴 긴 프롬프트를 Claude Code가 바로 받기 전에 가로채서 마크다운으로 구조화하고, 승인을 받은 뒤 작업 Claude에게 넘기는 Claude Code mod입니다.

## 동작

1. 입력창에서 보낸 프롬프트가 기준 길이(기본 200자) 이상이고 음성 받아쓰기로 판정되면 전송을 멈춥니다.
2. 별도의 모델 호출(기본 `sonnet`)로 원문을 구조화합니다.
   - 군말과 반복은 걷어내고, 요청과 조건은 빠뜨리지 않으며, 원문에 없는 내용은 덧붙이지 않습니다.
   - 헤딩(`#`, `##`, `###`), 불릿(`-`, `*`), 번호 목록을 쓰고, 볼드와 이탤릭은 쓰지 않습니다.
3. Transprompt 패널에 미리보기를 띄우고 다음 중 하나를 고르게 합니다.
   - 1 승인하고 보내기
   - 2 입력창에서 고치기
   - 3 원문 그대로 보내기
   - 4 다시 구조화
   - 5 취소 (원문을 입력창으로)

슬래시 명령, 이미지 첨부가 있는 프롬프트, 다른 세션이나 백그라운드 작업이 보낸 메시지는 가로채지 않습니다.

## 음성 판정

엔진은 받아쓰기 여부를 알려 주지 않으므로 점수로 추정합니다(`hooks/voice.ts`).

- 입력 방식: 글자가 한 번에 덩어리로 들어오면 가점, 키보드로 한 글자씩 쳤으면 타이핑으로 확정
- 텍스트: 줄바꿈, 코드나 마크다운 기호, 영문 비율, 군말, 접속사 반복, 구어체 어미, 문장부호 밀도

`/transprompt why`로 마지막 프롬프트의 점수와 근거를 볼 수 있습니다.

## 설치

터미널 세션의 프롬프트에서:

```
/plugin install transprompt --marketplace Gudals0320/transprompt
```

셸에서:

```bash
claude plugin install transprompt --marketplace Gudals0320/transprompt
```

데스크톱 앱에서는 `/plugin`이 동작하지 않습니다. 프롬프트 입력창 옆 + 버튼, Plugins, Add marketplace에 `Gudals0320/transprompt`를 넣고 Add plugin을 누르세요.

## 명령과 설정

- `/transprompt on`, `/transprompt off`: 켜고 끄기 (세션이 바뀌어도 유지)
- `/transprompt status`: 현재 설정 보기
- `/transprompt why`: 마지막 프롬프트의 판정 근거 보기

| 설정 | 기본값 | 설명 |
| --- | --- | --- |
| `minChars` | 200 | 이 글자 수 이상만 가로챕니다 |
| `model` | `sonnet` | 구조화에 쓸 모델 |
| `voiceGate` | `true` | 끄면 음성 판정 없이 길이만 봅니다 |
| `voiceThreshold` | 2 | 이 점수 이상이면 음성으로 봅니다 |

## 개발

```bash
claude plugin validate .
claude plugin test .
```
