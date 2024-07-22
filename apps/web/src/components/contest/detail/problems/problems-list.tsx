"use client";
import React from "react";
import CommitRecord from "./commit-record";
import EvaluateRecord from "./evaluate-record";
import { useRequest } from "ahooks";
import { request } from "@/lib/request";
import Loading from "@/app/(home)/loading";
interface PropsType {
  tid: string;
}
const ProblemsList: React.FC<PropsType> = (props) => {
  const { tid } = props;
  const { data, loading, refresh } = useRequest(async () => {
    const { data } = await request.get(`/contest/${tid as "{tid}"}/problems`, {
      transformData: ({ data }) => {
        return { data };
      },
    });
    return {
      pdict: data.pdict,
      rdocs: data.rdocs,
      psdict: data.psdict,
    };
  });
  const visibilitychangeEvent = () => {
    if (!document.hidden) {
      refresh();
    }
  };
  document.addEventListener("visibilitychange", visibilitychangeEvent);
  const plist = data?.pdict ?? {};
  const plistKeys = Object.keys(plist || {});
  const psdict = data?.psdict ?? {};
  const rdocs = data?.rdocs;
  const commitRecords = plistKeys.slice(0, plistKeys.length / 2).map((key, index) => {
    const res = {
      key: key,
      tid: tid,
      pid: plist[key].pid,
      status: "没有递交" as string | number,
      title: String.fromCharCode("A".charCodeAt(0) + index) + " " + plist[key].title,
      last_commit: "-",
      score: 0,
    };
    if (psdict[key]) {
      res.status = psdict[key].status ?? 0;
      res.score = psdict[key].score ?? 0;
    }
    for (let i = 0; i < (rdocs?.length ?? 0); i++) {
      if (rdocs?.[i]?.pid === Number(key)) {
        res.last_commit = rdocs[i].judgeAt;
        break;
      }
    }
    return res;
  });
  const evaluaRecords =
    rdocs?.map((item) => {
      return {
        key: item._id,
        score: item.score,
        status: item.status,
        title: plist[item.pid].title,
        time: parseInt(String(item.time)),
        memory: ((item.memory as number) / 1024).toFixed(1),
        language: item.lang,
        last_commit: item.judgeAt,
      };
    }) ?? [];
  return loading ? (
    <Loading />
  ) : (
    <div className="px-4">
      <CommitRecord records={commitRecords} />
      <EvaluateRecord evaluaRecords={evaluaRecords} />
    </div>
  );
};
export default ProblemsList;
