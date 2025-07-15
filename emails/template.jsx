import {
  Body,
  Button,
  Container,
  Head,
  Heading,
  Html,
  Preview,
  Section,
  Text,
} from "@react-email/components";
import * as React from "react";

export default function EmailTemplate({
  userName = "",
  type = "monthly-report",
  data = {},
}) {
  if (type === "monthly-report") {
    const net = data?.stats?.totalIncome - data?.stats?.totalExpenses;
    const netColor = net >= 0 ? "#22c55e" : "#ef4444";

    return (
      <Html>
        <Head />
        <Preview>Your Monthly Financial Report is Ready</Preview>
        <Body style={styles.body}>
          <Container style={styles.container}>
            <Heading style={styles.title}>📅 Monthly Financial Summary</Heading>

            <Text style={styles.greeting}>Hi {userName},</Text>
            <Text style={styles.text}>
              Here's a quick overview of your finances for{" "}
              <strong>{data?.month}</strong>:
            </Text>

            {/* Main Stats */}
            <Section style={styles.statsContainer}>
              <Heading style={styles.sectionHeading}>📊 Overview</Heading>
              <div style={styles.stat}>
                <Text style={styles.label}>Total Income</Text>
                <Text style={styles.value}>₹{data?.stats?.totalIncome}</Text>
              </div>
              <div style={styles.stat}>
                <Text style={styles.label}>Total Expenses</Text>
                <Text style={styles.value}>₹{data?.stats?.totalExpenses}</Text>
              </div>
              <div style={styles.stat}>
                <Text style={styles.label}>Net Savings</Text>
                <Text style={{ ...styles.value, color: netColor }}>₹{net}</Text>
              </div>
            </Section>

            {/* Category Breakdown */}
            {data?.stats?.byCategory && (
              <Section style={styles.statsContainer}>
                <Heading style={styles.sectionHeading}>
                  📂 Expenses by Category
                </Heading>
                {Object.entries(data.stats.byCategory).map(
                  ([category, amount]) => (
                    <div key={category} style={styles.row}>
                      <Text style={styles.text}>{category}</Text>
                      <Text style={styles.text}>₹{amount}</Text>
                    </div>
                  )
                )}
              </Section>
            )}

            {/* AI Insights */}
            {data?.insights && (
              <Section style={styles.statsContainer}>
                <Heading style={styles.sectionHeading}>
                  🤖 Welth AI Insights
                </Heading>
                {data.insights.map((insight, index) => (
                  <Text key={index} style={styles.text}>
                    • {insight}
                  </Text>
                ))}
              </Section>
            )}

            <Section style={{ marginTop: "30px", textAlign: "center" }}>
              <Button href="https://saveior.app" style={styles.button}>
                Go to Dashboard →
              </Button>
            </Section>

            <Text style={styles.footer}>
              Thanks for using <strong>Saveior</strong>! Stay consistent and
              build better financial habits 🚀
            </Text>
          </Container>
        </Body>
      </Html>
    );
  }

  if (type === "budget-report") {
    return (
      <Html>
        <Head />
        <Preview>You're nearing your monthly budget limit</Preview>
        <Body style={styles.body}>
          <Container style={styles.container}>
            <Heading style={styles.title}>Budget Alert 🚨</Heading>
            <Text style={styles.greeting}>Hi {userName},</Text>
            <Text style={styles.text}>
              You've already used{" "}
              <strong>{data.percentUsed.toFixed(1)}%</strong> of your monthly
              budget. Please review your spending.
            </Text>

            <Section style={styles.statsContainer}>
              <Heading style={styles.usageHeading}>
                {data.percentUsed.toFixed(1)}% Used 💸
              </Heading>
              <div
                style={{
                  backgroundColor: "#333",
                  borderRadius: "4px",
                  height: "10px",
                  width: "100%",
                  margin: "10px auto",
                  overflow: "hidden",
                }}>
                <div
                  style={{
                    height: "100%",
                    width: `${data.percentUsed}%`,
                    backgroundColor: "#red",
                    transition: "width 0.3s ease",
                  }}></div>
              </div>

              <div style={styles.statsRow}>
                <div style={styles.statsBox}>
                  <Text style={styles.label}>📊 Total Budget</Text>
                  <Text style={styles.value}>₹{data.budgetAmount}</Text>
                </div>
                <div style={styles.statsBox}>
                  <Text style={styles.label}>💳 Spent</Text>
                  <Text style={styles.value}>₹{data.totalExpenses}</Text>
                </div>
                <div style={styles.statsBox}>
                  <Text style={styles.label}>💼 Remaining</Text>
                  <Text style={styles.value}>
                    ₹{data.budgetAmount - data.totalExpenses}
                  </Text>
                </div>
              </div>
            </Section>

            <Section style={{ marginTop: "30px", textAlign: "center" }}>
              <Button href="https://saveior.app" style={styles.button}>
                View Dashboard
              </Button>
            </Section>
          </Container>
        </Body>
      </Html>
    );
  }

  return null;
}
const styles = {
  body: {
    backgroundColor: "#111",
    color: "#ffffff",
    fontFamily: "Arial, sans-serif",
    padding: "40px 0",
  },
  container: {
    backgroundColor: "#1a1a1a",
    borderRadius: "12px",
    padding: "32px",
    maxWidth: "500px",
    margin: "auto",
  },
  title: {
    color: "#8b5cf6",
    fontSize: "24px",
    fontWeight: "bold",
    marginBottom: "12px",
    textAlign: "center",
  },
  greeting: {
    fontSize: "16px",
    color: "#e0e0e0",
    marginBottom: "8px",
  },
  text: {
    fontSize: "15px",
    color: "#d4d4d4",
    marginBottom: "20px",
    lineHeight: "1.5",
  },
  usageHeading: {
    fontSize: "22px",
    fontWeight: "bold",
    color: "#ffffff",
    textAlign: "center",
    margin: "16px 0",
  },
  statsContainer: {
    backgroundColor: "#222",
    borderRadius: "12px",
    padding: "24px 20px",
  },
  statsRow: {
    display: "flex",
    flexDirection: "column", // stacked vertically for email compatibility
    gap: "16px",
    width: "100%",
    marginTop: "12px",
  },
  statsBox: {
    backgroundColor: "#181818",
    padding: "16px",
    borderRadius: "8px",
    textAlign: "center",
    border: "1px solid #333",
    width: "90%",
  },
  label: {
    fontSize: "14px",
    color: "#a3a3a3",
    marginBottom: "6px",
    display: "block",
  },
  value: {
    fontSize: "20px",
    color: "#4f46e5",
    fontWeight: "600",
  },
  button: {
    backgroundColor: "#4f46e5",
    color: "#ffffff",
    padding: "12px 24px",
    borderRadius: "8px",
    fontWeight: "bold",
    textDecoration: "none",
  },
};
