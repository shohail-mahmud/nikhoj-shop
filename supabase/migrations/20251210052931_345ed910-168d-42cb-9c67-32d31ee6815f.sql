-- First, add more values to the enum to support common categories
-- We'll add a generic 'other' option as a fallback
ALTER TYPE product_category ADD VALUE IF NOT EXISTS 'other';