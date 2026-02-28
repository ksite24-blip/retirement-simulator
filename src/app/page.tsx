"use client";

import Link from "next/link";
import { useState, useMemo } from "react";

const NOTICE_DAYS = 30;
const BONUS_MONTHS_SALARY = 1;

// 賃金日額の上限（令和6年頃の概算・地域により異なる）
const WAGE_DAILY_CAP_UNDER30 = 7065;
const WAGE_DAILY_CAP_30_TO_44 = 7845;
const WAGE_DAILY_CAP_45_TO_59 = 8635;
const WAGE_DAILY_CAP_60_64 = 7955;
const WAGE_DAILY_FLOOR = 2730;

// 基本手当 給付率（賃金日額に対する割合）
const BENEFIT_RATE_UNDER60 = 0.5;
const BENEFIT_RATE_60_64 = 0.45;

const RESTRICTION_DAYS_SELF = 90; // 自己都合時の給付制限（日数）

type LeaveReason = "self" | "company";

function parseBonusMonths(input: string): number[] {
  return input
    .split(/[,、\s]+/)
    .map((s) => parseInt(s.trim(), 10))
    .filter((n) => !isNaN(n) && n >= 1 && n <= 12)
    .sort((a, b) => a - b);
}

function addDays(date: Date, days: number): Date {
  const d = new Date(date);
  d.setDate(d.getDate() + days);
  return d;
}

function getNextBonusMonth(
  now: Date,
  bonusMonths: number[]
): { month: number; year: number } | null {
  if (bonusMonths.length === 0) return null;
  const currentMonth = now.getMonth() + 1;
  const currentYear = now.getFullYear();
  for (const m of bonusMonths) {
    if (m > currentMonth) return { month: m, year: currentYear };
    if (m === currentMonth) {
      const next = bonusMonths[0];
      return { month: next, year: currentYear + 1 };
    }
  }
  return { month: bonusMonths[0], year: currentYear + 1 };
}

function formatDate(d: Date): string {
  return `${d.getFullYear()}年${d.getMonth() + 1}月${d.getDate()}日`;
}

/** 賃金日額の上限（年齢帯） */
function getWageDailyCap(age: number): number {
  if (age < 30) return WAGE_DAILY_CAP_UNDER30;
  if (age < 45) return WAGE_DAILY_CAP_30_TO_44;
  if (age < 60) return WAGE_DAILY_CAP_45_TO_59;
  if (age <= 64) return WAGE_DAILY_CAP_60_64;
  return WAGE_DAILY_CAP_60_64;
}

/** 基本手当の給付率 */
function getBenefitRate(age: number): number {
  return age >= 60 && age <= 64 ? BENEFIT_RATE_60_64 : BENEFIT_RATE_UNDER60;
}

/** 所定給付日数（会社都合・特定受給資格者等）厚労省表に基づく */
function getBenefitDaysCompany(age: number, yearsOfService: number): number | null {
  const y = yearsOfService;
  if (age < 30) {
    if (y < 1) return 90;
    if (y < 5) return 90;
    if (y < 10) return 120;
    if (y < 20) return 180;
    return 180;
  }
  if (age < 35) {
    if (y < 1) return 120;
    if (y < 5) return 180;
    if (y < 10) return 210;
    if (y < 20) return 240;
    return 240;
  }
  if (age < 45) {
    if (y < 1) return 150;
    if (y < 5) return 240;
    if (y < 10) return 270;
    if (y < 20) return 270;
    return 270;
  }
  if (age < 60) {
    if (y < 1) return 180;
    if (y < 5) return 240;
    if (y < 10) return 270;
    if (y < 20) return 330;
    return 330;
  }
  if (age <= 64) {
    if (y < 1) return 150;
    if (y < 5) return 180;
    if (y < 10) return 210;
    if (y < 20) return 240;
    return 240;
  }
  return null;
}

/** 所定給付日数（自己都合・一般離職者） */
function getBenefitDaysSelf(yearsOfService: number): number {
  if (yearsOfService < 1) return 90;
  if (yearsOfService < 5) return 90;
  if (yearsOfService < 10) return 120;
  if (yearsOfService < 20) return 150;
  return 150;
}

export default function TaishokuSimulatorPage() {
  const [paidLeave, setPaidLeave] = useState<string>("10");
  const [salary, setSalary] = useState<string>("300000");
  const [bonusMonthsInput, setBonusMonthsInput] = useState<string>("6, 12");
  const [age, setAge] = useState<string>("35");
  const [yearsOfService, setYearsOfService] = useState<string>("5");
  const [leaveReason, setLeaveReason] = useState<LeaveReason>("self");

  const result = useMemo(() => {
    const paidLeaveNum = Math.max(0, parseInt(paidLeave, 10) || 0);
    const salaryNum = Math.max(0, parseInt(salary.replace(/,/g, ""), 10) || 0);
    const bonusMonths = parseBonusMonths(bonusMonthsInput);
    const ageNum = Math.min(64, Math.max(18, parseInt(age, 10) || 30));
    const yearsNum = Math.min(40, Math.max(0, parseFloat(yearsOfService) || 1));

    const today = new Date();
    today.setHours(0, 0, 0, 0);
    const dailyRate = salaryNum / 30;

    const freeFromDate = addDays(today, NOTICE_DAYS);
    const paidLeaveValue = dailyRate * paidLeaveNum;
    const nextBonus = getNextBonusMonth(today, bonusMonths);
    const bonusAmount = bonusMonths.length > 0 ? salaryNum * BONUS_MONTHS_SALARY : 0;

    // 失業保険：賃金日額（退職前6ヶ月の平均＝月給/30で概算）
    const wageDailyRaw = salaryNum / 30;
    const wageDailyCap = getWageDailyCap(ageNum);
    const wageDaily = Math.min(wageDailyCap, Math.max(WAGE_DAILY_FLOOR, Math.round(wageDailyRaw)));
    const benefitRate = getBenefitRate(ageNum);
    const benefitDaily = Math.floor(wageDaily * benefitRate);

    const benefitDays =
      leaveReason === "company"
        ? getBenefitDaysCompany(ageNum, yearsNum) ?? getBenefitDaysSelf(yearsNum)
        : getBenefitDaysSelf(yearsNum);

    const hasRestriction = leaveReason === "self";
    const unemploymentTotal = benefitDaily * benefitDays;
    const restrictionStartDate = hasRestriction ? addDays(freeFromDate, 7) : null; // 待期7日後から給付制限

    const workDays = Math.min(NOTICE_DAYS, 22);
    const salaryUntilResign = dailyRate * workDays;
    const totalAtShortest = salaryUntilResign + paidLeaveValue + unemploymentTotal;
    const totalIfWaitForBonus = nextBonus ? totalAtShortest + bonusAmount : totalAtShortest;
    const diff = totalAtShortest - totalIfWaitForBonus;
    const isLoss = diff < 0;

    return {
      freeFromDate,
      paidLeaveValue,
      paidLeaveNum,
      bonusAmount,
      nextBonus,
      salaryNum,
      diff,
      isLoss,
      wageDaily,
      benefitDaily,
      benefitDays,
      hasRestriction,
      unemploymentTotal,
      restrictionStartDate,
      ageNum,
      yearsNum,
    };
  }, [
    paidLeave,
    salary,
    bonusMonthsInput,
    age,
    yearsOfService,
    leaveReason,
  ]);

  return (
    <main className="min-h-screen bg-neutral-50 text-neutral-800">
      {/* ヘッダー：信頼感のある控えめデザイン */}
      <header className="border-b border-neutral-200 bg-white">
        <div className="mx-auto max-w-2xl px-4 py-5 sm:px-6">
          <h1 className="text-lg font-semibold tracking-tight text-neutral-900 sm:text-xl">
            退職シミュレーター
          </h1>
          <p className="mt-0.5 text-sm text-neutral-500">
            有給・給与・失業保険などの目安を試算します（FP監修を想定した参考ツール）
          </p>
        </div>
      </header>

      <div className="mx-auto max-w-2xl px-4 py-8 sm:px-6 sm:py-10">

        {/* 上部CTA */}
        <div className="mb-8">
          <Link
            href="/guide"
            className="flex w-full items-center justify-center gap-2 rounded-xl bg-emerald-500 px-6 py-4 text-base font-bold text-white shadow-[0_6px_0_#065f46] transition-all active:translate-y-1 active:shadow-[0_2px_0_#065f46] hover:bg-emerald-400 focus:outline-none focus:ring-2 focus:ring-emerald-400 focus:ring-offset-2 sm:py-5 sm:text-lg"
          >
            今の職場を脱出する計画を立てる →
          </Link>
        </div>

        {/* 入力セクション */}
        <section className="mb-10">
          <h2 className="mb-4 text-sm font-medium uppercase tracking-wider text-neutral-500">
            入力項目
          </h2>
          <div className="space-y-5 rounded-xl border border-neutral-200 bg-white p-5 shadow-sm sm:p-6">
            <div className="grid gap-5 sm:grid-cols-2">
              <div>
                <label className="block text-sm font-medium text-neutral-700">有給残日数</label>
                <input
                  type="number"
                  min={0}
                  value={paidLeave}
                  onChange={(e) => setPaidLeave(e.target.value)}
                  className="mt-1 w-full rounded-lg border border-neutral-300 bg-white px-3 py-2.5 text-neutral-900 shadow-sm focus:border-neutral-400 focus:outline-none focus:ring-1 focus:ring-neutral-400"
                  placeholder="例: 10"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-neutral-700">給与（月収・円）</label>
                <input
                  type="text"
                  inputMode="numeric"
                  value={salary}
                  onChange={(e) => setSalary(e.target.value.replace(/[^0-9,]/g, ""))}
                  className="mt-1 w-full rounded-lg border border-neutral-300 bg-white px-3 py-2.5 text-neutral-900 shadow-sm focus:border-neutral-400 focus:outline-none focus:ring-1 focus:ring-neutral-400"
                  placeholder="例: 300000"
                />
              </div>
            </div>
            <div>
              <label className="block text-sm font-medium text-neutral-700">
                ボーナス月（カンマ区切り）
              </label>
              <input
                type="text"
                value={bonusMonthsInput}
                onChange={(e) => setBonusMonthsInput(e.target.value)}
                className="mt-1 w-full rounded-lg border border-neutral-300 bg-white px-3 py-2.5 text-neutral-900 shadow-sm focus:border-neutral-400 focus:outline-none focus:ring-1 focus:ring-neutral-400"
                placeholder="例: 6, 12"
              />
              <p className="mt-1 text-xs text-neutral-500">6と12なら6月・12月に支給とみなします</p>
            </div>

            <hr className="border-neutral-200" />

            <div className="grid gap-5 sm:grid-cols-2">
              <div>
                <label className="block text-sm font-medium text-neutral-700">離職時の年齢</label>
                <input
                  type="number"
                  min={18}
                  max={64}
                  value={age}
                  onChange={(e) => setAge(e.target.value)}
                  className="mt-1 w-full rounded-lg border border-neutral-300 bg-white px-3 py-2.5 text-neutral-900 shadow-sm focus:border-neutral-400 focus:outline-none focus:ring-1 focus:ring-neutral-400"
                  placeholder="35"
                />
                <p className="mt-1 text-xs text-neutral-500">失業保険の給付日数・日額に影響します</p>
              </div>
              <div>
                <label className="block text-sm font-medium text-neutral-700">
                  勤続年数（雇用保険の被保険者期間）
                </label>
                <input
                  type="number"
                  min={0}
                  max={40}
                  step={0.5}
                  value={yearsOfService}
                  onChange={(e) => setYearsOfService(e.target.value)}
                  className="mt-1 w-full rounded-lg border border-neutral-300 bg-white px-3 py-2.5 text-neutral-900 shadow-sm focus:border-neutral-400 focus:outline-none focus:ring-1 focus:ring-neutral-400"
                  placeholder="例: 5"
                />
              </div>
            </div>
            <div>
              <label className="block text-sm font-medium text-neutral-700">離職理由</label>
              <div className="mt-2 flex gap-4">
                <label className="flex cursor-pointer items-center gap-2">
                  <input
                    type="radio"
                    name="leaveReason"
                    checked={leaveReason === "self"}
                    onChange={() => setLeaveReason("self")}
                    className="h-4 w-4 border-neutral-300 text-neutral-600 focus:ring-neutral-500"
                  />
                  <span className="text-sm text-neutral-700">自己都合（辞退・転職等）</span>
                </label>
                <label className="flex cursor-pointer items-center gap-2">
                  <input
                    type="radio"
                    name="leaveReason"
                    checked={leaveReason === "company"}
                    onChange={() => setLeaveReason("company")}
                    className="h-4 w-4 border-neutral-300 text-neutral-600 focus:ring-neutral-500"
                  />
                  <span className="text-sm text-neutral-700">会社都合・契約満了等</span>
                </label>
              </div>
              {result.hasRestriction && (
                <p className="mt-2 text-xs text-amber-700">
                  自己都合の場合は、離職日の翌日から3ヶ月間は基本手当が支給されません（給付制限）。
                </p>
              )}
            </div>
          </div>
        </section>

        {/* 試算結果 */}
        <section className="mb-10">
          <h2 className="mb-4 text-sm font-medium uppercase tracking-wider text-neutral-500">
            試算結果（目安）
          </h2>

          <div className="space-y-4">
            {/* 最短退職日 */}
            <div className="rounded-xl border border-neutral-200 bg-white p-5 shadow-sm">
              <h3 className="text-sm font-medium text-neutral-700">最短退職日（予告期間満了日）</h3>
              <p className="mt-1 text-xl font-semibold text-neutral-900">
                {formatDate(result.freeFromDate)}
              </p>
              <p className="mt-0.5 text-xs text-neutral-500">
                民法に基づく{NOTICE_DAYS}日の予告期間を満たした日
              </p>
            </div>

            {/* 有給の価値 */}
            <div className="rounded-xl border border-neutral-200 bg-white p-5 shadow-sm">
              <h3 className="text-sm font-medium text-neutral-700">有給休暇の価値（概算）</h3>
              <p className="mt-1 text-xl font-semibold text-neutral-900">
                ¥{Math.round(result.paidLeaveValue).toLocaleString()}
              </p>
              <p className="mt-0.5 text-xs text-neutral-500">
                {result.paidLeaveNum}日分。請求する権利があります。
              </p>
            </div>

            {/* 失業保険（基本手当） */}
            <div className="rounded-xl border border-neutral-200 bg-white p-5 shadow-sm">
              <h3 className="text-sm font-medium text-neutral-700">基本手当（失業保険）の概算</h3>
              <div className="mt-3 space-y-1 text-sm text-neutral-600">
                <p>賃金日額（上限適用後）: ¥{result.wageDaily.toLocaleString()}</p>
                <p>基本手当日額: ¥{result.benefitDaily.toLocaleString()}</p>
                <p>所定給付日数: {result.benefitDays}日</p>
                {result.hasRestriction && result.restrictionStartDate && (
                  <p className="text-amber-700">
                    給付制限により、実質の支給開始は約{formatDate(result.restrictionStartDate)}以降となります。
                  </p>
                )}
              </div>
              <p className="mt-3 text-xl font-semibold text-neutral-900">
                総支給額の目安: ¥{result.unemploymentTotal.toLocaleString()}
              </p>
            </div>

            {/* ボーナスとの比較 */}
            {result.nextBonus && (
              <div className="rounded-xl border border-neutral-200 bg-white p-5 shadow-sm">
                <h3 className="text-sm font-medium text-neutral-700">
                  ボーナス月まで在籍した場合との差額（目安）
                </h3>
                <p className="mt-2 text-lg font-semibold text-neutral-900">
                  {result.isLoss ? "△" : ""}
                  ¥{Math.abs(Math.round(result.diff)).toLocaleString()}
                  {result.isLoss ? "（ボーナスまで待つ方が多い）" : "（早期退職の方が多い）"}
                </p>
                <p className="mt-0.5 text-xs text-neutral-500">
                  次回ボーナス（{result.nextBonus?.year}年{result.nextBonus?.month}月）まで在籍した場合の目安: 約¥
                  {result.bonusAmount.toLocaleString()}
                </p>
              </div>
            )}

            {/* 社会保険の減免アドバイス */}
            <div className="rounded-xl border border-neutral-200 bg-white p-5 shadow-sm">
              <h3 className="text-sm font-medium text-neutral-700">
                社会保険（健康保険・年金）について
              </h3>
              <ul className="mt-3 list-inside list-disc space-y-2 text-sm leading-relaxed text-neutral-600">
                <li>
                  <strong className="text-neutral-700">健康保険</strong>
                  退職後は「任意継続被保険者」（最大2年）か国民健康保険に加入します。収入が著しく減少した場合、国保では減額・免除の申請ができる場合があります。市区町村の窓口でご確認ください。
                </li>
                <li>
                  <strong className="text-neutral-700">年金</strong>
                  退職後は国民年金の第1号被保険者となります。所得が少ない場合、国民年金保険料の「免除・猶予」制度の申請が可能です。学生は「学生納付特例」も検討できます。いずれも申請が必要です。
                </li>
              </ul>
              <p className="mt-3 text-xs text-neutral-500">
                詳細はお住まいの市区町村・年金事務所・ハローワークでご確認ください。
              </p>
            </div>

            {/* ガイドへの導線 */}
            <div className="pt-2">
              <Link
                href="/guide"
                className="flex w-full items-center justify-center gap-2 rounded-xl bg-emerald-500 px-6 py-4 text-base font-bold text-white shadow-[0_6px_0_#065f46] transition-all active:translate-y-1 active:shadow-[0_2px_0_#065f46] hover:bg-emerald-400 focus:outline-none focus:ring-2 focus:ring-emerald-400 focus:ring-offset-2 sm:py-5 sm:text-lg"
              >
                今の職場を脱出する計画を立てる →
              </Link>
              <p className="mt-2 text-center text-xs text-neutral-500">
                退職の流れ・有給・失業保険をまとめた完全ガイドへ
              </p>
            </div>
          </div>
        </section>

        {/* 免責・CTA（控えめ） */}
        <footer className="border-t border-neutral-200 pt-8">
          <p className="text-center text-xs leading-relaxed text-neutral-500">
            本シミュレーションは目安であり、実際の給付額・給付日数・社会保険は就業規則・雇用保険法・厚生年金保険法・健康保険法等に基づき異なる場合があります。確定はハローワーク・年金事務所等でご確認ください。
          </p>
        </footer>
      </div>
    </main>
  );
}
