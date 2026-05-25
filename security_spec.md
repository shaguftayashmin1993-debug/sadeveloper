# Security Specification

## Data Invariants
1. An Inquiry must contain a valid name, email, message, status, and createdAt timestamp.
2. A Project must have a unique alphanumeric Code (e.g. `SA-5491`) conforming to regular validation rules.
3. Timestamp validations like `request.time` must align with `createdAt` and `updatedAt`.
4. Standard users can read the project matching their unique project ID, but cannot modify anything.
5. Inquiries can be written anonymously/by anyone (creation), but can only be read by authorized admins.

## The "Dirty Dozen" Payloads
These represent unauthorized attempts to break data integrity or security boundaries:
1. Try to set `status` of project to 'Handover' directly without permissions.
2. Try to change `progressPercent` of a project to outside [0...100].
3. Try to write an inquiry with a spoofed `id` of 1MB of junk characters.
4. Try to update a system-immutable field like `createdAt` on a project.
5. Try to read other projects containing PII without being the designated owner or admin.
6. Try to create/register a project code as a standard user.
7. Try to delete an inquiry as an anonymous customer.
8. Submitting an inquiry with a spoofed `createdAt` in the future instead of server `request.time`.
9. Modifying another customer's progress milestone as an unauthenticated attacker.
10. Attempting to list all inquiries (admin queries) as an unauthenticated or standard user.
11. Update project status without updating `updatedAt` server timestamp.
12. Attempt to create dynamic system entries inside projects collection without proper structural shape.
