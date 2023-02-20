import fetch from "../../lib/fetch";

export async function getPlans() {
  try {
    return await fetch("/api/plan/", {
      method: "GET",
    });
  } catch (error) {
    return [];
  }
}

export async function changePlan(body) {
  const data = await fetch("/api/plan/change", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      // 'Content-Type': 'application/x-www-form-urlencoded',
    },
    body: JSON.stringify(body),
  });
  return data;
}
