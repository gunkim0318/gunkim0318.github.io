import React, { useState, useEffect, useCallback } from "react";
import { Link } from "gatsby";
import { makeStyles } from "@material-ui/core/styles";
import LinearProgress from "@material-ui/core/LinearProgress";

const useStyles = makeStyles({
  root: {
    width: "100%",
  },
});
import "./index.scss";

export const Top = ({ title, location, rootPath }) => {
  const [width, setWidth] = useState(0);
  const classes = useStyles();

  const handleScroll = useCallback(() => {
    const { scrollTop, scrollHeight, clientHeight } = document.documentElement;

    if (scrollTop === 0) {
      // 스크롤바가 가장 위에있을때는 0으로 처리
      setWidth(0);
      return;
    }

    const windowHeight = scrollHeight - clientHeight;
    // 스크롤바 크기 = (내용 전체의 높이) - (스크롤바를 제외한 클라이언트 높이)

    const currentPercent = scrollTop / windowHeight;
    // 스크롤바 크기 기준으로 scrollTop이 내려온만큼에 따라 계산 (계산시 소수점 둘째자리까지 반환)

    setWidth(currentPercent * 100);
    // 소수점 둘째자리 까지이므로, 100을 곱하여 정수로 만들어줍니다.
  }, []);

  useEffect(() => {
    window.addEventListener("scroll", handleScroll, true);

    return () => {
      window.removeEventListener("scroll", handleScroll, true);
    };
  }, [handleScroll]);

  const isRoot = location.pathname === rootPath;
  if (isRoot) {
    return <></>;
  }
  return (
    <div className="top">
      <Link to={`/`} className="link">
        {title}
      </Link>
      <div className={classes.root}>
        <LinearProgress color="secondary" variant="determinate" value={width} />
      </div>
    </div>
  );
};
