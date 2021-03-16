---
date: "2021-03-16"
title: 2년 동안의 블로그 플랫폼 여행기, 그리고 정착
tags: [Review]
category: Think
draft: false
---

약 2년이 넘도록 블로그를 이곳저곳 떠돌다 이번에 완전 Gatsby.js + Nelify에 정착하게 되어서 그동안의 여행기를 정리해보려고 한다.

# 블로그 플랫폼 선택에서의 고민

블로그가 참 많다 보니 블로그를 처음 시작하는 입장에서는 블로그만 이곳저곳 장단점만 비교하다가 지쳐서 그냥 블로그를 포기하게 되는 것 같다. (내 경우가 그랬다.) 그래서 내가 실질적으로 느낀 장점과 단점에 대해서 적어보겠다.

## Naver

### 장점

- 네이버 검색 노출이 잘 된다.
- 준수한 블로그 테마
- 우리나라 독보적 1위 포털 사이트의 힘
- 게시물에 코드를 삽입하기 불편함
- 이웃들과 소통 가능

### 단점

- 구글 검색 노출이 잘되지 않음
- 커스텀에 제한이 있음

## Tistory

### 장점

- 구글 검색 노출이 잘 된다.
- 방문자 수 집계 등 여러 통계 기능 지원
- 커스텀에 어느 정도 자유로움
- 코드 삽입 지원이 잘 됨
- Markdown 지원
- 이쁜 테마들이 꽤 많음

### 단점

- 상관없는 유저의 블로그를 차단하는 등 이슈가 있음
- 블로그 글 백업 기능이 삭제됨

## Github Page

### 장점

- 뭔가 개발자 블로그 같다
- Tistory보다는 아니지만 준수한 구글 검색 노출
- 게시글에 코드를 첨부하기 편함
- 커스텀이 100% 자유로움
- Markdown 지원
- 글 쓰거나 블로그를 수정해도 잔디가 심어짐
- 직접 모든 기능이나 디자인을 만들어야 하기 때문에 개발자스러움

### 단점

- 마지막 장점이 곧 단점

일반 사용자 입장에서는 구글보다 네이버가 더 유리한 측면이 있다. 하지만 개발자에게 구글 검색 노출은 치명적이기 때문에 제외하고, 티스토리와 깃허브 페이지를 비교했을 때 귀찮으면 티스토리가 좋고, 깃허브에 익숙해지면서 직접 만들어나가고 싶다고 하면 깃허브 페이지가 좋다. 정도로 정리할 수 있을 것 같다.

# 블로그 플랫폼에서의 고민

![image](https://user-images.githubusercontent.com/45007556/111280159-da377180-867e-11eb-8d1f-0ce2fc90e86a.png)

결국 고민 끝에 Github Pages Jekyll 테마를 이용해서 쭉 운영해오고 있었다. 그런데 문제가 있었는데, 무엇보다 마음에 쏙 드는 디자인과 기능 모두를 만족하는 테마는 찾을 수가 없었다. Jekyll 테마의 경우 외국인들이 만든 테마가 대부분이어서 부가적인 요소이지만, 네이버 블로그나 티스토리같이 사이드바를 통한 카테고리 블로그를 이용해오던 나로서는 심리적인 불편함을 호소하게 되었는데... 그 후로 테마를 몇 번이나 뒤집어엎으면서 삽질을 하다 보니 블로그의 순기능인 글쓰기는 뒷전이고, 코드만 수정하는 나날이 계속되었다.

## 그러던 중 Gatsby Theme로 이동

그러던 중 내가 공부하던 React.js도 호스팅할 수 있다는 것을 알게 되어서 이번엔 Gatsby Starter에서 쓸만한 테마를 탐방했다.
![image](https://user-images.githubusercontent.com/45007556/111281667-8a59aa00-8680-11eb-84ae-c333ac5639ff.png)

## 호스팅 플랫폼 선택

Github Pages에서 Gatsby.js를 호스팅 하려면 크나큰 문제가 있었는데, 그것은 바로 Github Pages는 js를 빌드 해주지 못해, push 할 때 빌드 된 파일들을 올려주어야 정상적으로 호스팅이 된다. 그런데 그렇게 되면 내 레포지토리에 쓸데없는 파일들로 인해 지저분해지고, 유지 보수 측면에서도 매우 불리해진다고 생각해 다른 방법을 모색해 보았다.
그렇게 선택한 것이 Nelify이다. 직접 빌드 및 호스팅까지 모두 자동으로 해주게 되어 편리하고, Github Pages에 비해 지원도 잘해주어 결국 호스팅 플랫폼을 이사하게 되었다. 호스팅 플랫폼이 달라져서 블로그 주소가 달라진다는 문제점이 있었지만, 어차피 나는 개인 도메인을 사용했기 때문에 도메인만 옮겨주면 되는 문제라 안 넘어갈 이유가 없었다.
![image](https://user-images.githubusercontent.com/45007556/111283605-a5c5b480-8682-11eb-955c-fef3ec5a5613.png)

## 블로그 완성

최종적으로 선택한 테마는 gatsby-starter-bee 테마로 해당 테마를 조금 커스텀하여 지금의 블로그 모습이 되었다.
![image](https://user-images.githubusercontent.com/45007556/111282078-ee7c6e00-8680-11eb-8924-8360decdefa2.png)

# 총평

Gatsby 블로그의 장점은 React.js 기반으로 html 요소들을 컴포넌트로 관리할 수 있어 유지 보수가 편하고, 각종 라이브러리들을 쉽게 npm을 통해 지원받을 수 있다는 것이 넘사벽급 장점인 것 같다. 게다가 리액트 공부도 되니 일석이조가 아닐 수 없다. 이 장점을 공유하는 Next.js와 비교도 해보았지만, Gatsby.js를 우선 사용해보려고 한다. 결국 내가 원하는 디자인 및 기능들을 모두 만족하려면 그냥 직접 만드는 게 빠르다는 것을 느꼈다. 나중에 시간이 나면 직접 만들어서 출시해봐야 겠다.
위에 서술한 내용들로 인해 한동안 블로그 활동이 뜸했는데, 이상하게 조회 수는 계속 올라가는 걸 보고 이제부터라도 열심히 글을 써보아야겠다는 생각도 들면서 반성을 해보기도 한다.
![image](https://user-images.githubusercontent.com/45007556/111284646-aad73380-8683-11eb-942f-b153be47e123.png)