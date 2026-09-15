---
title: Forward and Inverse Kinematics Talk at Boston Robot Hackers Club
date: 2026-08-06
excerpt: A ground-up walk through forward and inverse kinematics for the Boston Robot Hackers Club, from rotation matrices to Jacobian-based IK.
tags: [Talks, Community]
draft: false
---

On Thursday, August 6, 2026, Shivam was the featured speaker at Boston Robot Hackers Club, held at Artisans Asylum in Boston. The talk, "Forward & Inverse Kinematics: The Math," was a ground-up walk through the two questions every roboticist eventually has to answer: given joint angles, where is the end-effector (forward kinematics), and given a target, what joint angles get you there (inverse kinematics).

The session covered:

* Rotation matrices, homogeneous transforms, and the Denavit-Hartenberg convention, used to derive FK for a serial manipulator step by step.
* Why IK is generally non-linear, often has multiple solutions (or none), and cannot always be solved in closed form.
* Geometric approaches for simple cases, Jacobian-based numerical methods for the general case, and where things break down near singularities.

The goal was to leave attendees with enough intuition to read a kinematics derivation, implement a basic solver, and know which approach to reach for on their own robot, whether a 3-DOF desktop arm or something more exotic.

Read the full announcement on the [Boston Robot Hackers site](https://bostonrobothackers.com/news/23-shivam-chopra-talk-announcement.html).
