Running 10s test @ http://localhost:3000
10 connections

┌─────────┬──────┬──────┬───────┬──────┬─────────┬─────────┬──────────┐
│ Stat    │ 2.5% │ 50%  │ 97.5% │ 99%  │ Avg     │ Stdev   │ Max      │
├─────────┼──────┼──────┼───────┼──────┼─────────┼─────────┼──────────┤
│ Latency │ 0 ms │ 0 ms │ 0 ms  │ 1 ms │ 0.02 ms │ 0.16 ms │ 16.45 ms │
└─────────┴──────┴──────┴───────┴──────┴─────────┴─────────┴──────────┘
┌───────────┬─────────┬─────────┬─────────┬─────────┬─────────┬─────────┬─────────┐
│ Stat      │ 1%      │ 2.5%    │ 50%     │ 97.5%   │ Avg     │ Stdev   │ Min     │
├───────────┼─────────┼─────────┼─────────┼─────────┼─────────┼─────────┼─────────┤
│ Req/Sec   │ 20623   │ 20623   │ 25583   │ 26271   │ 25131.2 │ 1540.94 │ 20615   │
├───────────┼─────────┼─────────┼─────────┼─────────┼─────────┼─────────┼─────────┤
│ Bytes/Sec │ 2.29 MB │ 2.29 MB │ 2.84 MB │ 2.92 MB │ 2.79 MB │ 171 kB  │ 2.29 MB │
└───────────┴─────────┴─────────┴─────────┴─────────┴─────────┴─────────┴─────────┘

Req/Bytes counts sampled once per second.

251k requests in 10.05s, 27.9 MB read

------------------------------------------------

Description:
- 1. Request latency (Do tre cua request)
+ 2.5% - percentile (thong ke), the fast outliers (ngoai le nhanh)
+ 50% - the median (muc trung binh), the slow outliers (ngoai le cham)
+ 99% - the very slowest outliers (ngoai le cham nhat)
=> Cang thap cang nhanh

- 2. Request volume (Cho khoi luong request) - So luong yeu cau da gui va so byte duoc tai xuong, cac gia tri nay duoc lay mau mot lan moi giay, cac gia tri lon hon cac request da xu ly
+ 2.29MB da tai xuong trong 1s trong truong hop xau nhat (worst) - thap nhat la 1%
+ Vi chi chay moi 10s va 10 vi du, gia tri toi thieu va phan tram 1% va 2.5% deu la cung mot mau
+ 