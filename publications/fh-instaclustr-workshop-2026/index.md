---
marp: true
paginate: false
title: Building Resilient Event-Driven Systems with Kafka and Flink
backgroundImage: url('./images/bg.png')
backgroundSize: cover
style: |
  @font-face {
    font-family: 'Stolzl';
    src: url('./fonts/Stolzl-Regular.woff') format('woff');
    font-weight: normal;
    font-style: normal;
  }
  section {
    font-family: 'Stolzl', sans-serif;
    font-size: 1.5em;
    color: white;
    padding: 1.25em;
  }
  * {
    font-weight: 400;
  }
  h1, h2, h3, h4, h5, h6, p, li {
    color: white;
    font-weight: 700;
  }
  .center {
    text-align: center;
  }
  a {
    color: white;
    border-bottom: 1px dashed white;
    text-decoration: none;
  }
---

# Building Resilient<br>Event-Driven Systems<br>with Kafka and Flink

<br><br><br><br>

## Presented by<br>[**Factor House**](https://factorhouse.io/) and [**NetApp Instaclustr**](https://www.instaclustr.com/)

![bg right fit small](./images/qr-code.png)

---

# Presenters

![](./images/presenters.png)

---

# KartShoppe 🛒

- **Modern, Decoupled E-Commerce Reference Architecture**
- **Full-Stack: React Frontend, Quarkus, Kafka & Flink**

## Key Learning Objectives

- **Event-Driven Architecture**
- **Reactive Microservices**
- **Apache Flink Fundamentals**
- **Stateful Stream Processing**
- **Database Change Data Capture (CDC)**

![bg right fit](./images/kartshoppe.png)

---

# Environment Setup

- **Verify Prerequisites**
  - `./setup-environment.sh`
- **Infrastructure Launch**
  - **Kafka Cluster**
  - **PostgreSQL**
- **Factor House Community License**
- **Update `.env` and `application.properties`**
- **Training Platform Launch**
  - `python scripts/manage_topics.py --action create`
  - `python scripts/manage_db.py --action init`
  - `./start-platform-remote.sh`

![bg right fit](./images/training-platform.png)

---

# Live End-to-End Demo

- **Scenario A: Naive Implementation**
  - Real-time state synchronization across user sessions.
  - Powered by Event-Driven Architecture (Quarkus + Kafka).
  - Flink acts as the centralized "Brain" for business logic.
- **Scenario B: CDC Implementation**
  - Establishes Database as Single Source of Truth.
  - Uses Flink CDC to solve the Dual Write problem.

---

# Architecture Overview

- **Quarkus:** The View (Command/Query separation).
- **Flink:** The Brain (Business Logic).
- **Kafka:** The Nervous System (Data Transport).

![bg right fit](./images/architecture-overview.png)

---

# Backend Deep Dive

- **CQRS (Command Query Responsibility Segregation):**
  - **Write Path:** Async processing via Flink & Postgres.
  - **Read Path:** Instant queries via Quarkus.
- **Event Sourcing:**
  - **Source of Truth:** The Kafka Topic (Log).
  - **State:** Replayed history builds the local **KTable**.
  - **Result:** Zero-latency reads; no database bottlenecks.

![bg right fit](./images/backend-deep-dive.png)

---

# Flink Deep Dive

- **Inventory Job (The Brain)**
  - **Hybrid Source:** Bootstraps from File to Real-time (Kafka).
  - **Main Process:** Handles _orders_ and _product updates_ in one stream.
  - **Advanced Patterns:**
    - **Side outputs** for alerts and **timers** to manage expiration logic.
- **Flink CDC (The Safety Net)**
  - Addresses the dual-write challenge.
  - Ensures a single source of truth.

![bg right fit](./images/flink-deep-dive.png)

---

# Lab 1 - Native Implementation

- **Setup:** Open **Browser A** (Buyer) and **Browser B** (Incognito/Observer).
- **Action:** User A purchases "_FutureTech UltraBook Pro 15_" (PROD_0001).
- **Reaction:** User B's inventory count drops instantly.
- **Observability:** Switch to **Kpow**. Trace the purchase event using Data Inspect.

![bg right fit](./images/lab-1-demo.gif)

---

# Lab 2 - CDC Implementation

- **Action:** Reset inventory using **Kpow** (Data Produce/Edit).
- **Action:** User A purchases the item again while toggling **"Use Flink CDC"** in the UI.
- **Reaction:** Inventory updates exactly as before (Seamless User Experience).
- **Observability:** Switch to **Flex** and inspect Flink jobs.

![bg right fit](./images/lab-2-demo.gif)

---

# Key Takeaways

- **Quarkus:**
  - Reactive UI requires separating Reads (WebSockets) from Writes (REST).
- **Flink:**
  - Not just for analytics. It handles core business logic and state.
- **CDC:**
  - Essential for data integrity in distributed systems.
