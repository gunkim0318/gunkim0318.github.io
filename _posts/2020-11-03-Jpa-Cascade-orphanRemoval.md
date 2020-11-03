---
layout: post
title: JPA 영속성 전이와 고아 객체(orphan)
category: Jpa
tags: [Jpa]
---

영속성 전이와 관련되어서 크게 삽질한 내용이 있어서 정리할 겸 같이 작성해보려고 한다.

# 영속성 전이란?

영속 상태의 엔티티 객체에 수행되는 작업이 연관된 자식 엔티티까지 전파되는 것이다.

## 전파되면 뭐가 좋은데?

아래 예제 코드를 보면서 영속성 전이가 어떤건지 살펴보도록 하겠다.

_User.java_

```java
@Entity
public class User{
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    Long id;
    @Column(nullable = false)
    String name;
    String email;
    @OneToMany(mappedBy = "user", fetch = FetchType.LAZY)
    List<Posts> postsList = ArrayList<Posts>();
}
```

_Posts.java_

```java
@Entity
class Posts{
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    Long id;
    @Column(nullable = false)
    String contents;
    @ManyToOne
    @JoinColumn(name="user_id")
    User user;
}
```

```java
User user = new User();
user.name = "gunkim";
user.email = "gunkim0318@gmail.com";

userRepository.save(user); //persist

Posts posts = new Posts();
posts.contents = "게시글 내용";
posts.user = user;

postsRepository.save(posts); //persist
```

해당 예제코드는 Posts엔티티를 저장(persist)하기 위한 소스이다. Posts 엔티티를 입력하기 위해서 User 엔티티를 입력하고, Posts엔티티를 입력한다.
이를 위해서 번거롭게 저장(persist)하는 코드를 두번 작성해야 하는 번거로움이 있다.

_User.java_

```java
@Entity
public class User{
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    Long id;
    @Column(nullable = false)
    String name;
    String email;
    @OneToMany(mappedBy = "user", fetch = FetchType.LAZY, cascade = CascadeType.PERSIST)
    List<Posts> postsList = ArrayList<Posts>();
}
```

```java
User user = new User();
user.name = "gunkim";
user.email = "gunkim0318@gmail.com";

Posts posts = new Posts();
posts.contents = "게시글 내용";
posts.user = user;

user.postsList.add(posts);
userRepository.save(user); //user, posts persist
```

영속성 전이를 이용한다면 이렇게 부모 엔티티인 User 엔티티를 저장(persist)하면서 같이 자식인 Posts 엔티티도 같이 저장(persist)되게끔 할 수 있다.  
영속성 전이를 잘 활용하면 자식의 생명주기도 관리할 수 있게 되어 편리하지만, 잘못 사용하면 예상치 못한 결과가 발생할 수 있으니 주의가 필요하다.

# 영속성 전이 옵션

위의 예제에서 이용한 CascadeType.PERSIST 옵션 말고도 JPA에서는 여러 옵션들을 추가로 지원해주는데 아래와 같다.

- **CascadeType.ALL** - 모든 Cascade 옵션 적용
- **CascadeType.PERSIST** - 부모 엔티티를 영속화할 때 자식 엔티티도 영속(persist)화 시킨다.
- **CascadeType.MERGE** - 부모 엔티티를 병합할 때 자식 엔티티도 병합(merge)한다.
- **CascadeType.REFRESH** - 부모 엔티티를 읽어들일 때 자식 엔티티도 다시 읽어들인다(refresh).
- **CascadeType.REMOVE** - 부모 엔티티를 삭제할 때 자식 엔티티도 삭제(remove)한다.
- **CascadeType.DETACH** - 부모 엔티티를 준영속(detach)화 할 때 자식 엔티티도 준영속(detach)화 한다.

# 고아(orphan) 객체

부모 엔티티와 관계가 끊어진 자식 엔티티를 **고아 객체**라고 하는데 이를 삭제하고 싶을 때 **orphanRemoval=true** 옵션을 이용한다.

## CascadeType.REMOVE와의 차이점

부모 엔티티가 삭제되면 자식 엔티티를 삭제한다는 행위라는 관점에서는 동일하다. 그런데 이 둘은 삭제 조건이 다르다고 볼 수 있을 것 같다.

## **CascadeType.REMOVE**

단순히 부모 엔티티가 삭제될 때 자식 엔티티를 같이 삭제하는 것

## **orphanRemoval=true**

부모 엔티티가 삭제되면 관계가 끊어지기 때문에 관계가 끊어져 고아 객체가 된 자식 엔티티를 삭제하는 것

## 그럼 결국 같은 말 아니야?

**orphanRemoval=true**는 부모-자식 관계가 끊어지게 되면 고아 객체가 된 자식 엔티티를 삭제 한다고 했다. 그런데 이 관계가 끊어지는 경우는 부모 엔티티가 삭제됐을 때만이 아니다. 아래 예제 코드를 한번 살펴보자.

```java
User user = userRepository.findAll().get(0);
user.postsList.clear();
```

이렇게 User(부모)엔티티에서 보유하고 있는 Posts 엔티티들을 초기화 해주었다. 이렇게 되면 자연히 Posts(자식) 엔티티는 고아 객체가 되어 자동으로 삭제(delete)된다.

### +**orphanRemoval=true**와 CascadeType.REMOVE를 같이 사용해야 한다.

원래는 **orphanRemoval=true**옵션만 추가하게 되면 작동이 되어야 하는 게 맞을텐데, 작동이 안되어서 구글링해본 결과 **CascadeType.REMOVE**와 같이 사용해야 작동한다는 답변을 발견했다. 아마 원인은 하이버네이트 쪽 문제가 아닌가 하는 의견이 있어서 첨부한다.[참고](https://github.com/mjung1798/Jyami-Java-Lab/issues/1)

## CascadeType.PERSIST와 같이 사용하면 생기는 문제

_User.java_

```java
@Entity
public class User{
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    Long id;
    @Column(nullable = false)
    String name;
    String email;
    @OneToMany(mappedBy = "user", fetch = FetchType.LAZY, cascade = CascadeType.PERSIST, orphanRemoval=true)
    List<Posts> postsList = ArrayList<Posts>();
}
```

```java
Posts posts = postsRepository.findAll().get(0);
postsRepository.delete(posts);
```

이건 내가 직면했던 문제인데, **CascadeType.PERSIST**와 **orphanRemoval=true**를 같이 사용하게 되면 delete()메소드를 실행했음에도 delete쿼리가 발생하지 않았다. 적극적으로 디버깅 및 구글링을 해보았으나 정확한 원인은 찾을 수 없었으나 아마 이게 참고가 되었다. 원인을 알게된다면 제보 바람.[참고](https://joont92.github.io/jpa/CascadeType-PERSIST%EB%A5%BC-%ED%95%A8%EB%B6%80%EB%A1%9C-%EC%82%AC%EC%9A%A9%ED%95%98%EB%A9%B4-%EC%95%88%EB%90%98%EB%8A%94-%EC%9D%B4%EC%9C%A0/)
