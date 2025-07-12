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
  type = "budget-report",
  data = {},
}) {
  if (type === "monthly-report") {
    return (
      <Html>
        <Head />
        <Body>
          <Container>
            <Button
              href="https://example.com"
              style={{
                background: "#4f46e5",
                color: "#fff",
                padding: "12px 20px",
                borderRadius: "8px",
              }}>
              View Monthly Report
            </Button>
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
